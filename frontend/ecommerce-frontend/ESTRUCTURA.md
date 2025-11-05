# Frontend - E-commerce Project

Proyecto frontend desarrollado con Vue 3 + TypeScript + Vite + Tailwind CSS.

## 📁 Estructura del Proyecto

```
src/
├── assets/              # Recursos estáticos (CSS, imágenes, fuentes)
│   └── main.css        # Estilos globales con Tailwind
│
├── components/          # Componentes reutilizables
│   ├── Layout.vue      # Layout principal con navegación
│   └── ProductCard.vue # Tarjeta de producto
│
├── composables/         # Composables de Vue (lógica reutilizable)
│   ├── index.ts        # Exportaciones centralizadas
│   ├── useFormatter.ts # Formateo de datos (precios, fechas)
│   └── useNotification.ts # Sistema de notificaciones
│
├── router/              # Configuración de Vue Router
│   └── index.ts        # Definición de rutas
│
├── services/            # Servicios de API
│   ├── api.ts          # Cliente HTTP con Axios
│   ├── authService.ts  # Autenticación (login, register, logout)
│   ├── cartService.ts  # Gestión del carrito
│   ├── orderService.ts # Gestión de órdenes
│   └── productService.ts # Gestión de productos
│
├── stores/              # Estado global con Pinia
│   ├── index.ts        # Exportaciones centralizadas
│   ├── authStore.ts    # Estado de autenticación
│   ├── cartStore.ts    # Estado del carrito
│   └── productStore.ts # Estado de productos
│
├── types/               # Definiciones de tipos TypeScript
│   └── index.ts        # Tipos globales (Product, User, Order, etc.)
│
├── utils/               # Funciones utilitarias
│   ├── index.ts        # Exportaciones centralizadas
│   ├── constants.ts    # Constantes de la aplicación
│   ├── helpers.ts      # Funciones auxiliares
│   └── validators.ts   # Funciones de validación
│
├── views/               # Vistas/Páginas de la aplicación
│   ├── HomeView.vue         # Página principal
│   ├── ProductsView.vue     # Catálogo de productos
│   ├── ProductDetailView.vue # Detalle de producto
│   ├── CartView.vue         # Carrito de compras
│   ├── CheckoutView.vue     # Proceso de checkout
│   ├── DealsView.vue        # Ofertas especiales
│   └── ContactView.vue      # Página de contacto
│
├── App.vue              # Componente raíz
└── main.ts              # Punto de entrada de la aplicación
```

## 🎯 Arquitectura y Patrones

### Composables
Funciones reutilizables que encapsulan lógica de negocio:
- `useFormatter`: Formateo de precios, fechas, números
- `useNotification`: Sistema de notificaciones toast

### Services
Capa de abstracción para comunicación con la API:
- Singleton pattern para instancias únicas
- Manejo centralizado de errores
- Tipado completo con TypeScript

### Stores (Pinia)
Estado global de la aplicación:
- `authStore`: Autenticación y usuario actual
- `cartStore`: Carrito de compras con persistencia en localStorage
- `productStore`: Productos y categorías

### Utils
Funciones utilitarias puras:
- `validators`: Validación de formularios
- `helpers`: Funciones auxiliares (formateo, debounce, etc.)
- `constants`: Constantes de la aplicación

## 🔧 Configuración

### Variables de Entorno
Crear archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:8000/api
```

### Comandos Disponibles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint

# Testing
npm run test:unit
npm run test:e2e
```

## 📦 Dependencias Principales

- **Vue 3**: Framework progresivo
- **TypeScript**: Tipado estático
- **Vite**: Build tool ultra rápido
- **Tailwind CSS**: Framework de utilidades CSS
- **Pinia**: Estado global
- **Vue Router**: Enrutamiento
- **Axios**: Cliente HTTP
- **Heroicons**: Iconos SVG
- **vue-toastification**: Notificaciones

## 🎨 Sistema de Diseño

### Colores
- **Primario**: Negro (#000000)
- **Secundario**: Blanco (#FFFFFF)
- **Grises**: Escala del 50 al 900

### Componentes Base
Clases Tailwind predefinidas en `main.css`:
- `.btn-primary`: Botón primario negro
- `.btn-secondary`: Botón secundario blanco con borde
- `.card`: Tarjeta con sombra y bordes redondeados
- `.input-field`: Campo de entrada estilizado

### Animaciones
Animaciones personalizadas:
- `fadeIn`: Aparición gradual
- `slideUp`: Deslizamiento hacia arriba
- `slideDown`: Deslizamiento hacia abajo
- `scaleIn`: Escala desde 0

## 🚀 Mejores Prácticas

1. **Componentes**: Un componente = Una responsabilidad
2. **TypeScript**: Tipar todo (props, eventos, retornos)
3. **Composables**: Lógica reutilizable en composables
4. **Services**: Toda comunicación con API en services
5. **Stores**: Estado global solo cuando sea necesario
6. **Validación**: Usar utils/validators para validaciones
7. **Constantes**: Definir constantes en utils/constants
8. **Nomenclatura**: camelCase para variables, PascalCase para componentes

## 📝 Notas de Desarrollo

- Los componentes usan `<script setup lang="ts">` para mejor DX
- Las imágenes se cargan desde URLs externas (Unsplash)
- El carrito persiste en localStorage
- Las notificaciones usan vue-toastification
- El layout es responsive (mobile-first)

## 🔐 Autenticación

El sistema de autenticación usa JWT:
1. Login genera access y refresh tokens
2. Access token se incluye en cada request
3. Refresh token se usa para renovar el access token
4. Los tokens se guardan en localStorage

## 🛒 Flujo de Compra

1. **Explorar productos** → ProductsView
2. **Ver detalle** → ProductDetailView
3. **Agregar al carrito** → CartStore
4. **Ver carrito** → CartView
5. **Checkout** → CheckoutView (3 pasos)
6. **Confirmación** → Creación de orden

## 📱 Responsive Design

Breakpoints de Tailwind:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## 🎓 Recursos

- [Vue 3 Docs](https://vuejs.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [Pinia Docs](https://pinia.vuejs.org/)
- [Vite Guide](https://vitejs.dev/)
