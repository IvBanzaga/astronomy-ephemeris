# 🤖 Guía del GitHub Actions para Efemérides Astronómicas

## 🌟 ¿Qué hace este sistema?

Este proyecto utiliza **GitHub Actions** para generar automáticamente efemérides astronómicas en español todos los días. Las efemérides son frases educativas sobre eventos astronómicos, exploración espacial y descubrimientos importantes.

## ⏰ Programación Automática

### 🕐 Ejecución Diaria
- **Hora**: Todos los días a las **8:00 AM UTC** (10:00 AM hora de España)
- **Frecuencia**: Automática, 365 días al año
- **Contenido**: Genera una efeméride para el día siguiente

### 📅 Ubicación del Workflow
```
.github/workflows/generate-ephemeris.yml
```

## 🎮 Ejecución Manual

Puedes ejecutar el workflow manualmente desde GitHub:

1. **Ve a tu repositorio en GitHub**
2. **Haz clic en la pestaña "Actions"**
3. **Selecciona "🌟 Generate Daily Astronomy Ephemeris"**
4. **Haz clic en "Run workflow"**
5. **Elige las opciones:**
   - **Modo**: `tomorrow`, `week`, `month`, o `multiple`
   - **Días**: Número específico de días (solo para modo `multiple`)

### 🔧 Modos de Ejecución

| Modo | Descripción | Ejemplo |
|------|-------------|---------|
| `tomorrow` | Genera 1 efeméride para mañana | Ejecución diaria automática |
| `week` | Genera 7 efemérides | Llenar una semana |
| `month` | Genera 30 efemérides | Llenar un mes |
| `multiple` | Genera N efemérides | Número personalizado |

## 🔑 Configuración de Secrets

Para que funcione, necesitas configurar estos secrets en GitHub:

### 📍 Cómo configurar secrets:
1. **Ve a Settings > Secrets and variables > Actions**
2. **Haz clic en "New repository secret"**
3. **Agrega estos tres secrets:**

| Secret | Descripción | Dónde obtenerlo |
|--------|-------------|-----------------|
| `OPENAI_API_KEY` | Tu clave de OpenAI | [OpenAI Platform](https://platform.openai.com/api-keys) |
| `NEXT_PUBLIC_SUPABASE_URL` | URL de tu proyecto Supabase | Panel de Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave anónima de Supabase | Panel de Supabase |

## 📊 Monitoreo y Logs

### ✅ Verificar que funciona:
1. **Pestaña Actions**: Ve el historial de ejecuciones
2. **Logs detallados**: Cada step muestra información clara
3. **Base de datos**: Verifica que aparecen nuevas efemérides
4. **Aplicación web**: Las efemérides se muestran automáticamente

### 🚨 Solución de problemas:

#### ❌ Errores comunes:
- **Secret no configurado**: Revisa que todos los secrets estén correctos
- **Límite de OpenAI**: Verifica que tienes créditos disponibles
- **Error de Supabase**: Comprueba la conexión a la base de datos
- **Duplicados**: El sistema evita crear efemérides duplicadas

#### 🔍 Cómo debuggear:
1. **Ve a Actions > [Ejecución fallida]**
2. **Expande el step que falló**
3. **Lee los logs detallados**
4. **Busca mensajes de error específicos**

## 🎯 Características del Contenido

### 📝 Especificaciones:
- **Idioma**: Español
- **Longitud**: Máximo 200 palabras
- **Formato**: "[Título] - [Descripción educativa]"
- **Temas**: Astronomía, exploración espacial, descubrimientos

### 🌌 Tipos de efemérides:
- 🚀 **Exploración espacial**: Lanzamientos, misiones, alunizajes
- 🌟 **Fenómenos astronómicos**: Conjunciones, eclipses, meteoros
- 🔭 **Descubrimientos**: Hitos importantes en astronomía
- 🏛️ **Aniversarios**: Observatorios, telescopios, instituciones
- 🪐 **Sistema solar**: Planetas, asteroides, cometas

## 🛠️ Archivos Importantes

### 📁 Estructura:
```
.github/workflows/
  └── generate-ephemeris.yml     # Workflow principal
generate-ephemeris.mjs           # Script de generación
lib/ephemeris-data.ts           # Lógica de lectura
GITHUB_ACTIONS_SETUP.md         # Configuración inicial
```

### 🔄 Flujo de trabajo:
1. **Trigger**: Cron o manual
2. **Setup**: Node.js + dependencias
3. **Validación**: Variables de entorno
4. **Generación**: OpenAI crea contenido
5. **Almacenamiento**: Supabase guarda datos
6. **Notificación**: Logs de éxito/error

## 🎉 Beneficios

✅ **Automatización completa**: Sin intervención manual
✅ **Contenido único**: Cada día algo nuevo
✅ **Educativo**: Información verificada y accesible
✅ **Escalable**: Puede generar múltiples días
✅ **Robusto**: Validaciones y manejo de errores
✅ **Monitoreable**: Logs claros y detallados

---

## 🆘 Soporte

Si tienes problemas:
1. **Revisa los logs** en la pestaña Actions
2. **Verifica los secrets** en Settings
3. **Comprueba los créditos** de OpenAI
4. **Revisa la documentación** de Supabase

¡Tu sistema de efemérides astronómicas automáticas está listo! 🌟
