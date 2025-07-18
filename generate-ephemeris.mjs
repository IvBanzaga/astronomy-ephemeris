import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import OpenAI from 'openai'

// Cargar variables de entorno (solo si existe .env.local, para desarrollo local)
try {
  dotenv.config({ path: '.env.local' })
} catch (error) {
  // En GitHub Actions, las variables se pasan directamente como env vars
  console.log('ℹ️ No .env.local found, using environment variables')
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const openaiApiKey = process.env.OPENAI_API_KEY

// Inicializar clientes
const supabase = createClient(supabaseUrl, supabaseAnonKey)
const openai = new OpenAI({
  apiKey: openaiApiKey,
})

// Array de nombres de meses en español
const monthNames = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
]

/**
 * Genera una efeméride astronómica usando OpenAI
 * @param {Date} date - Fecha para la cual generar la efeméride
 * @returns {Promise<Object>} - Objeto con los datos de la efeméride
 */
async function generateEphemerisWithAI(date) {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  const monthName = monthNames[month - 1]

  const prompt = `
Genera una efeméride astronómica precisa y educativa para el ${day} de ${monthName} de ${year}.

REQUISITOS IMPORTANTES:
1. La efeméride debe ser históricamente precisa y verificable
2. Debe estar relacionada con astronomía, exploración espacial, o eventos celestiales
3. Si no hay un evento específico para esta fecha exacta, puedes usar eventos que ocurrieron en fechas cercanas o eventos astronómicos regulares
4. El formato debe ser: "[Título del evento] - [Descripción educativa de 1-2 oraciones]"
5. Incluye el año histórico cuando sea relevante
6. La descripción debe ser interesante y educativa
7. MÁXIMO 200 PALABRAS en total
8. Escribe EXCLUSIVAMENTE en español con vocabulario científico apropiado

EJEMPLOS de buenos formatos:
- "Conjunción de Venus y Marte - Evento astronómico donde Venus y Marte aparecen muy cerca en el cielo nocturno, ofreciendo una excelente oportunidad de observación para astrónomos aficionados"
- "Alunizaje del Apollo 11 (1969) - Neil Armstrong y Buzz Aldrin se convirtieron en los primeros humanos en caminar sobre la superficie lunar, marcando un hito histórico en la exploración espacial"
- "Lluvia de meteoros Perseidas - Máximo de actividad de esta lluvia de meteoros originada por los restos del cometa Swift-Tuttle, visible desde el hemisferio norte"

TIPOS DE EVENTOS que puedes usar:
- Eventos de exploración espacial (lanzamientos, alunizajes, misiones)
- Fenómenos astronómicos (conjunciones, oposiciones, eclipses, lluvias de meteoros)
- Descubrimientos astronómicos importantes
- Aniversarios de observatorios o telescopios importantes
- Eventos relacionados con planetas, asteroides, cometas

Responde SOLO con el evento en el formato solicitado, sin explicaciones adicionales. Asegúrate de que sea educativo y no exceda 200 palabras.
`

  try {
    console.log(`🤖 Generando efeméride para ${day}/${month}/${year}...`)

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Eres un experto en astronomía e historia espacial que genera efemérides astronómicas precisas y educativas en español. Siempre respetas el límite de 200 palabras máximo y usas un lenguaje científico apropiado pero accesible."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 150, // Reducido para asegurar que no exceda 200 palabras
      temperature: 0.7,
    })

    const generatedText = completion.choices[0].message.content.trim()
    console.log(`✅ Efeméride generada: ${generatedText.substring(0, 80)}...`)

    // Parsear el texto generado
    const parts = generatedText.split(' - ')
    const title = parts[0]
    const description = parts.length > 1 ? parts.slice(1).join(' - ') : generatedText

    // Extraer año si está mencionado en el texto
    const yearMatch = description.match(/\b(1\d{3}|20\d{2})\b/)
    const historicalYear = yearMatch ? parseInt(yearMatch[0]) : year

    return {
      day,
      month,
      year,
      event: generatedText,
      display_date: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
      historical_day: day,
      historical_month: month,
      historical_year: historicalYear
    }

  } catch (error) {
    console.error('❌ Error generando efeméride con IA:', error)
    throw error
  }
}

/**
 * Verifica si ya existe una efeméride para una fecha específica
 * @param {number} day - Día
 * @param {number} month - Mes
 * @param {number} year - Año
 * @returns {Promise<boolean>} - True si ya existe
 */
async function ephemerisExists(day, month, year) {
  try {
    const { data, error } = await supabase
      .from('ephemerides')
      .select('id')
      .eq('day', day)
      .eq('month', month)
      .eq('year', year)
      .limit(1)

    if (error) {
      console.error('❌ Error verificando existencia:', error)
      return false
    }

    return data && data.length > 0
  } catch (error) {
    console.error('❌ Error verificando existencia:', error)
    return false
  }
}

/**
 * Inserta una efeméride en Supabase
 * @param {Object} ephemerisData - Datos de la efeméride
 * @returns {Promise<boolean>} - True si se insertó correctamente
 */
async function insertEphemeris(ephemerisData) {
  try {
    console.log(`📝 Insertando efeméride en Supabase...`)

    const { data, error } = await supabase
      .from('ephemerides')
      .insert([ephemerisData])
      .select()

    if (error) {
      console.error('❌ Error insertando efeméride:', error)
      return false
    }

    console.log(`✅ Efeméride insertada exitosamente con ID: ${data[0].id}`)
    return true

  } catch (error) {
    console.error('❌ Error insertando efeméride:', error)
    return false
  }
}

/**
 * Genera efeméride para el día siguiente
 * @returns {Promise<boolean>} - True si se completó exitosamente
 */
async function generateTomorrowEphemeris() {
  try {
    console.log('🌟 Iniciando generación de efeméride para mañana...')

    // Calcular fecha de mañana
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)

    const day = tomorrow.getDate()
    const month = tomorrow.getMonth() + 1
    const year = tomorrow.getFullYear()

    console.log(`📅 Fecha objetivo: ${day}/${month}/${year}`)

    // Verificar si ya existe
    const exists = await ephemerisExists(day, month, year)
    if (exists) {
      console.log(`⚠️ Ya existe una efeméride para ${day}/${month}/${year}`)
      return true
    }

    // Generar nueva efeméride
    const ephemerisData = await generateEphemerisWithAI(tomorrow)

    // Insertar en la base de datos
    const success = await insertEphemeris(ephemerisData)

    if (success) {
      console.log(`🎉 ¡Efeméride generada e insertada exitosamente para ${day}/${month}/${year}!`)
      console.log(`📖 Evento: ${ephemerisData.event}`)
      return true
    } else {
      console.log(`❌ Error insertando la efeméride`)
      return false
    }

  } catch (error) {
    console.error('❌ Error en el proceso de generación:', error)
    return false
  }
}

/**
 * Genera efemérides para múltiples días (útil para poblar la base de datos)
 * @param {number} days - Número de días a generar
 * @returns {Promise<void>}
 */
async function generateMultipleDays(days = 7) {
  console.log(`🚀 Generando efemérides para los próximos ${days} días...`)

  const results = []

  for (let i = 1; i <= days; i++) {
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + i)

    const day = targetDate.getDate()
    const month = targetDate.getMonth() + 1
    const year = targetDate.getFullYear()

    // Verificar si ya existe
    const exists = await ephemerisExists(day, month, year)
    if (exists) {
      console.log(`⏭️ Saltando ${day}/${month}/${year} - ya existe`)
      results.push({ date: `${day}/${month}/${year}`, status: 'skipped' })
      continue
    }

    try {
      // Generar y insertar
      const ephemerisData = await generateEphemerisWithAI(targetDate)
      const success = await insertEphemeris(ephemerisData)

      results.push({
        date: `${day}/${month}/${year}`,
        status: success ? 'success' : 'failed',
        event: ephemerisData.event.substring(0, 50) + '...'
      })

      // Pausa entre llamadas para no sobrecargar la API
      if (i < days) {
        console.log('⏳ Esperando 2 segundos antes de la siguiente generación...')
        await new Promise(resolve => setTimeout(resolve, 2000))
      }

    } catch (error) {
      console.error(`❌ Error generando efeméride para ${day}/${month}/${year}:`, error)
      results.push({ date: `${day}/${month}/${year}`, status: 'error' })
    }
  }

  // Mostrar resumen
  console.log('\n📊 Resumen de generación:')
  results.forEach(result => {
    const icon = result.status === 'success' ? '✅' :
      result.status === 'skipped' ? '⏭️' : '❌'
    console.log(`${icon} ${result.date}: ${result.status} ${result.event || ''}`)
  })
}

// Función principal
async function main() {
  const args = process.argv.slice(2)
  const command = args[0] || 'tomorrow'

  switch (command) {
    case 'tomorrow':
      await generateTomorrowEphemeris()
      break

    case 'week':
      await generateMultipleDays(7)
      break

    case 'month':
      await generateMultipleDays(30)
      break

    case 'multiple':
      const days = parseInt(args[1]) || 7
      await generateMultipleDays(days)
      break

    default:
      console.log(`
🌟 Generador automático de efemérides astronómicas

Uso:
  node generate-ephemeris.mjs [comando] [opciones]

Comandos:
  tomorrow          Genera efeméride para mañana (por defecto)
  week             Genera efemérides para los próximos 7 días
  month            Genera efemérides para los próximos 30 días
  multiple [días]   Genera efemérides para el número específico de días

Ejemplos:
  node generate-ephemeris.mjs
  node generate-ephemeris.mjs week
  node generate-ephemeris.mjs multiple 10
      `)
      break
  }
}

// Verificar que las variables de entorno estén configuradas
if (!supabaseUrl || !supabaseAnonKey || !openaiApiKey) {
  console.error('❌ Error: Variables de entorno faltantes')
  console.error('En desarrollo local: Asegúrate de tener un archivo .env.local con:')
  console.error('En GitHub Actions: Asegúrate de tener configurados los secrets:')
  console.error('- NEXT_PUBLIC_SUPABASE_URL')
  console.error('- NEXT_PUBLIC_SUPABASE_ANON_KEY')
  console.error('- OPENAI_API_KEY')
  console.error('\nRevisa el archivo GITHUB_ACTIONS_SETUP.md para más detalles')
  process.exit(1)
}// Ejecutar función principal
main().catch(error => {
  console.error('❌ Error fatal:', error)
  process.exit(1)
})
