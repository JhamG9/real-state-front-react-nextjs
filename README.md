# 🏠 Portal de Propiedades
Una app web para buscar y ver propiedades inmobiliarias. Creada con Next.js, React y Material-UI siguiendo una arquitectura hexagonal.

## Instalación
1. **Clonar el proyecto**
```bash
git clone https://github.com/JhamG9/real-state-front-react-nextjs.git
cd real-state-front-react-nextjs
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en desarrollo**
```bash
npm run dev
```

## Estructura del proyecto
```
src/
├── app/                    # Páginas de Next.js
├── modules/home/
│   ├── domain/             # Lógica de negocio
│   ├── infrastructure/     # Conexión con APIs
│   └── ui/                 # Componentes visuales
└── shared/                 # Utilidades compartidas
```

## ¿Qué incluye?
- Catálogo de propiedades con filtros en tiempo real
- Galería de imágenes interactiva
- Información detallada de cada propiedad
- Diseño responsivo para móvil y desktop
- Formularios manejados con React Hook Form

## Tecnologías
- **Next.js** - Framework de React
- **React** - Librería de UI
- **Material-UI** - Componentes de diseño
- **React Hook Form** - Manejo de formularios
- **TypeScript** - Para tipado estático

## Requisitos

- Node.js (versión 18 o superior)
- npm, yarn o pnpm

## Scripts

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build para producción
npm run start    # Servidor de producción
npm run lint     # Revisar código
```
