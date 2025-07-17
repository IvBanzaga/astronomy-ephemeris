# 🌟 Astronomy Ephemeris

Una aplicación web moderna que muestra efemérides astronómicas diarias generadas automáticamente con Inteligencia Artificial.

## ✨ Características

- 📅 **Efemérides diarias**: Eventos astronómicos únicos para cada día
- 🤖 **Generación automática con IA**: Utiliza OpenAI para crear contenido educativo
- 🚀 **Automatización con GitHub Actions**: Genera contenido automáticamente cada día
- 💾 **Base de datos Supabase**: Almacenamiento confiable y escalable
- 🎨 **Interfaz moderna**: Diseño elegante con Next.js y Tailwind CSS
- 🌙 **Tema astronómico**: Animaciones y efectos visuales inmersivos

## 🖥️ Vista previa

La aplicación muestra efemérides en el formato:

> **"El 17 de julio de 1969, evento astronómico notable donde Venus y Marte aparecen muy cerca en el cielo nocturno"**

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

## 🤖 Generación automática de efemérides

### Configuración de GitHub Actions

Para automatizar la generación diaria de efemérides, sigue las instrucciones detalladas en:
**[📖 GITHUB_ACTIONS_SETUP.md](./GITHUB_ACTIONS_SETUP.md)**

### Comandos manuales

```bash
# Generar efeméride para mañana
node generate-ephemeris.mjs tomorrow

# Generar para múltiples días
node generate-ephemeris.mjs multiple 7

# Generar para una semana
node generate-ephemeris.mjs week
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
