# 🌟 Astronomy Ephemeris

Una aplicación web moderna que muestra **efemérides astronómicas diarias en español** generadas automáticamente con Inteligencia Artificial. El sistema crea contenido educativo sobre astronomía, exploración espacial y descubrimientos importantes, con un máximo de 200 palabras por efeméride.

## ✨ Características Principales

- 📅 **Efemérides diarias automatizadas**: Eventos astronómicos únicos para cada día
- 🤖 **Generación con IA**: Utiliza OpenAI GPT-4o-mini para crear contenido educativo
- ⏰ **GitHub Actions**: Ejecuta automáticamente todos los días a las 8:00 AM UTC
- 🇪🇸 **Contenido en español**: Lenguaje científico apropiado pero accesible
- 💾 **Base de datos Supabase**: Almacenamiento confiable y escalable
- 🎨 **Interfaz moderna**: Diseño elegante con Next.js y Tailwind CSS
- 🌙 **Tema astronómico**: Animaciones y efectos visuales inmersivos

## 🤖 Sistema de Automatización

### ⏰ Generación Automática Diaria

- **Frecuencia**: Todos los días a las **8:00 AM UTC** (10:00 AM España)
- **Contenido**: Una efeméride astronómica para el día siguiente
- **Longitud**: Máximo 200 palabras en español
- **Temas**: Astronomía, exploración espacial, descubrimientos

### 🎮 Ejecución Manual

También puedes generar efemérides manualmente:

- Ve a **GitHub Actions** en tu repositorio
- Ejecuta **"🌟 Generate Daily Astronomy Ephemeris"**
- Elige entre diferentes modos: `tomorrow`, `week`, `month`, `multiple`

### 📚 Documentación Completa

- **[� Guía de GitHub Actions](./GITHUB_ACTIONS_GUIDE.md)** - Tutorial completo del sistema automatizado
- **[⚙️ Configuración Inicial](./GITHUB_ACTIONS_SETUP.md)** - Setup de secrets y variables

## �🖥️ Vista previa

La aplicación muestra efemérides en el formato:

> **"Conjunción de Venus y Marte (2025) - Evento astronómico donde Venus y Marte aparecen muy cerca en el cielo nocturno, ofreciendo una excelente oportunidad de observación para astrónomos aficionados desde el hemisferio norte."**

## 🚀 Inicio rápido

### Prerrequisitos

- Node.js 18+
- Cuenta de Supabase
- API Key de OpenAI (para generación automática)

### Instalación local

1. **Clona el repositorio**

   ```bash
   git clone <tu-repositorio>
   cd astronomy-ephemeris
   ```

2. **Instala dependencias**

   ```bash
   npm install
   # o
   pnpm install
   ```

3. **Configura variables de entorno**

   ```bash
   cp .env.example .env.local
   ```

   Edita `.env.local` con tus valores:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
   OPENAI_API_KEY=tu_openai_api_key
   ```

4. **Ejecuta el proyecto**
   ```bash
   npm run dev
   ```

## 🌌 Tipos de Efemérides Generadas

El sistema de IA crea contenido educativo sobre:

### 🚀 **Exploración Espacial**

- Lanzamientos históricos de misiones espaciales
- Alunizajes y caminatas espaciales
- Misiones a planetas y asteroides
- Aniversarios de la NASA, ESA y otras agencias

### 🌟 **Fenómenos Astronómicos**

- Conjunciones planetarias y oposiciones
- Eclipses solares y lunares
- Lluvias de meteoros (Perseidas, Leónidas, etc.)
- Apariciones de cometas

### 🔭 **Descubrimientos Importantes**

- Hallazgo de exoplanetas
- Descubrimientos del Telescopio Hubble y James Webb
- Ondas gravitacionales y agujeros negros
- Nuevas lunas y asteroides

### 🏛️ **Aniversarios Científicos**

- Inauguración de observatorios importantes
- Lanzamiento de telescopios espaciales
- Fundación de instituciones astronómicas
- Premios Nobel en Física relacionados con astronomía

## 🤖 Configuración del Sistema Automático

### 🔑 Secrets Requeridos en GitHub

Para que el sistema funcione automáticamente, configura estos secrets:

| Secret                          | Descripción                            | Dónde obtenerlo                                         |
| ------------------------------- | -------------------------------------- | ------------------------------------------------------- |
| `OPENAI_API_KEY`                | Clave de OpenAI para generar contenido | [OpenAI Platform](https://platform.openai.com/api-keys) |
| `NEXT_PUBLIC_SUPABASE_URL`      | URL de tu proyecto Supabase            | Panel de Supabase > Settings > API                      |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave anónima de Supabase              | Panel de Supabase > Settings > API                      |

### 📝 Comandos Disponibles

```bash
# Generar efeméride para mañana (automático diario)
node generate-ephemeris.mjs tomorrow

# Generar para múltiples días específicos
node generate-ephemeris.mjs multiple 7

# Generar para una semana completa
node generate-ephemeris.mjs week

# Generar para un mes completo
node generate-ephemeris.mjs month
```

## 🏗️ Arquitectura

### Frontend

- **Next.js 15** - Framework React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos
- **Lucide React** - Iconos

### Backend

- **Supabase** - Base de datos PostgreSQL
- **OpenAI API** - Generación de contenido con IA

### Automatización

- **GitHub Actions** - Ejecución diaria automática
- **Cron Jobs** - Programación temporal

## 📊 Base de datos

### Tabla `ephemerides`

```sql
- id: bigint (primary key)
- day: integer
- month: integer
- year: integer
- event: text
- display_date: date
- historical_day: integer
- historical_month: integer
- historical_year: integer
- created_at: timestamp
- updated_at: timestamp
```

## 🌟 Funcionalidades avanzadas

- ✅ **Verificación de duplicados**: No genera efemérides existentes
- ✅ **Formato consistente**: Estructura educativa uniforme
- ✅ **Manejo de errores**: Fallback a datos estáticos
- ✅ **Logging detallado**: Monitoreo de la generación
- ✅ **Ejecución manual**: Generación bajo demanda

## 🛠️ Scripts disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Construcción para producción
npm run start        # Servidor de producción
npm run lint         # Linting del código
```

## 📁 Estructura del proyecto

```
astronomy-ephemeris/
├── .github/workflows/     # GitHub Actions
├── app/                   # Páginas de Next.js
├── components/            # Componentes React
├── lib/                   # Utilidades y lógica
├── public/               # Archivos estáticos
├── styles/               # Estilos globales
├── generate-ephemeris.mjs # Generador automático
└── GITHUB_ACTIONS_SETUP.md # Guía de configuración
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙋‍♂️ Soporte

Si tienes preguntas o necesitas ayuda:

- 📧 Crea un issue en GitHub
- 📖 Revisa la documentación en `GITHUB_ACTIONS_SETUP.md`
- 🚀 Verifica los logs de GitHub Actions

---

**🌟 ¡Disfruta explorando el cosmos cada día!** 🌟
