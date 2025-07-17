# 🌟 Astronomy Ephemeris - Configuración de GitHub Actions

## 🚀 Configuración de Secrets en GitHub

Para que el generador automático de efemérides funcione, necesitas configurar los siguientes secrets en tu repositorio de GitHub:

### 📝 Pasos para configurar los Secrets:

1. **Ve a tu repositorio en GitHub**
2. **Haz clic en "Settings" (Configuración)**
3. **En el menú izquierdo, haz clic en "Secrets and variables" > "Actions"**
4. **Haz clic en "New repository secret"**
5. **Añade los siguientes secrets uno por uno:**

### 🔑 Secrets requeridos:

#### `NEXT_PUBLIC_SUPABASE_URL`

```
https://
```

#### `NEXT_PUBLIC_SUPABASE_ANON_KEY`

```
TU_CLAVE_SUPABASE_ANON_AQUI
```

#### `OPENAI_API_KEY`

```
TU_CLAVE_DE_OPENAI_API_AQUI
```

## ⚙️ Cómo funciona la automatización:

### 🕐 Ejecución automática diaria:

- **Hora**: Todos los días a las 8:00 AM UTC (10:00 AM hora de España)
- **Acción**: Genera automáticamente la efeméride para el día siguiente
- **Verificación**: Solo crea efemérides si no existen ya para esa fecha

### 🎮 Ejecución manual:

1. **Ve a la pestaña "Actions" en tu repositorio**
2. **Selecciona "Generate Daily Ephemeris"**
3. **Haz clic en "Run workflow"**
4. **Opcionalmente, especifica el número de días a generar**

## 📊 Monitoreo:

### ✅ Para verificar que funciona:

1. **Ve a "Actions" en tu repositorio**
2. **Revisa los logs de ejecución**
3. **Verifica en tu aplicación que aparecen las nuevas efemérides**

### 🚨 En caso de errores:

- **Revisa los logs de GitHub Actions**
- **Verifica que los secrets estén configurados correctamente**
- **Comprueba que tienes créditos disponibles en OpenAI**

## 🔄 Comandos disponibles:

```bash
# Generar para mañana (automático diario)
node generate-ephemeris.mjs tomorrow

# Generar para múltiples días (manual)
node generate-ephemeris.mjs multiple 7
```

## 📱 Aplicación en vivo:

Una vez configurado, tu aplicación generará automáticamente efemérides astronómicas educativas cada día, mostrándolas en el formato:

> **"El [día] de [mes] de [año], [descripción del evento astronómico]"**

---

## 🛠️ Archivos del proyecto:

### 📁 Archivos principales:

- `generate-ephemeris.mjs` - Generador automático de efemérides
- `.github/workflows/generate-ephemeris.yml` - Configuración de GitHub Actions
- `lib/ephemeris-data.ts` - Lógica de lectura desde Supabase
- `app/page.tsx` - Página principal de la aplicación

### 🗑️ Archivos eliminados (innecesarios):

- `check-api.js` - Script de prueba de conexión
- `check-tables.js` - Script de verificación de tablas
- `create-table.js` - Script de creación de tablas
- `insert-test-data.js` - Scripts de inserción de datos de prueba
- `test-*.mjs` - Scripts de prueba varios

¡Tu sistema de efemérides astronómicas automáticas está listo! 🌟
