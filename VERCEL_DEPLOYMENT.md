# 🚀 Guía de Despliegue en Vercel

## 🌟 Astronomy Ephemeris - Configuración de Producción

### ⚠️ **Error Común:**

```
Error: supabaseUrl is required.
```

Este error indica que las variables de entorno no están configuradas en Vercel.

## 🔧 **Solución: Configurar Variables de Entorno**

### 📋 **Variables Requeridas:**

| Variable                        | Descripción                                  | Dónde obtenerla                    |
| ------------------------------- | -------------------------------------------- | ---------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | URL de tu proyecto Supabase                  | Panel de Supabase > Settings > API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave anónima de Supabase                    | Panel de Supabase > Settings > API |
| `OPENAI_API_KEY`                | Clave de OpenAI (opcional para producción\*) | OpenAI Platform                    |

_\*Nota: `OPENAI_API_KEY` solo es necesaria si quieres que la generación automática funcione desde Vercel. Para mostrar efemérides ya generadas, solo necesitas las variables de Supabase._

### 🎯 **Pasos en Vercel:**

#### 1. **Acceder a Configuración**

- Ve a [vercel.com/dashboard](https://vercel.com/dashboard)
- Selecciona tu proyecto `astronomy-ephemeris`
- Haz clic en **"Settings"**

#### 2. **Configurar Variables de Entorno**

- Ve a **"Environment Variables"**
- Para cada variable:
  - **Name**: Nombre exacto (ej: `NEXT_PUBLIC_SUPABASE_URL`)
  - **Value**: Tu valor real
  - **Environments**: Selecciona **"Production"**, **"Preview"**, y **"Development"**
  - Haz clic en **"Save"**

#### 3. **Obtener Valores de Supabase**

1. Ve a [supabase.com](https://supabase.com)
2. Selecciona tu proyecto
3. Ve a **Settings > API**
4. Copia:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

#### 4. **Redesplegar**

- Ve a **"Deployments"**
- Haz clic en **"Redeploy"** en el último deployment
- Selecciona **"Use existing Build Cache"**
- Haz clic en **"Redeploy"**

### ✅ **Verificación:**

Después del redespliegue, tu aplicación debería:

- ✅ Cargar sin errores
- ✅ Mostrar efemérides desde la base de datos
- ✅ Tener animaciones y efectos visuales funcionando

### 🔍 **Troubleshooting:**

#### **Si sigue sin funcionar:**

1. **Verifica que las variables estén exactamente como se muestran** (case-sensitive)
2. **Revisa que los valores no tengan espacios extra** al inicio o final
3. **Comprueba que la URL de Supabase sea correcta** (debe empezar con `https://`)
4. **Asegúrate de que el proyecto de Supabase esté activo**

#### **Logs útiles:**

- Ve a **Deployments > [último deployment] > Function Logs**
- Busca errores específicos de conexión

### 🌐 **Configuración Recomendada:**

```bash
# Producción (Vercel)
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
OPENAI_API_KEY=sk-proj-... (opcional)
```

### 📱 **Resultado Esperado:**

Una vez configurado correctamente, tendrás:

- 🌟 Aplicación web funcionando en Vercel
- 📅 Efemérides astronómicas mostradas correctamente
- 🎨 Interfaz moderna con animaciones
- 🌙 Tema astronómico completo

---

## 🆘 **¿Necesitas ayuda?**

Si sigues teniendo problemas:

1. Revisa los logs en Vercel
2. Verifica la conexión a Supabase
3. Comprueba que las variables estén configuradas correctamente
