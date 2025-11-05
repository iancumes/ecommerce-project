// Constantes de la aplicación

// URLs de la API
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'
export const API_TIMEOUT = 30000 // 30 segundos

// Configuración de paginación
export const ITEMS_PER_PAGE = 12
export const MAX_PAGINATION_BUTTONS = 5

// Configuración de carrito
export const FREE_SHIPPING_THRESHOLD = 1000
export const DEFAULT_SHIPPING_COST = 200
export const MAX_CART_ITEMS = 99

// Configuración de productos
export const MIN_PRODUCT_PRICE = 0
export const MAX_PRODUCT_PRICE = 100000
export const DEFAULT_PRODUCT_IMAGE = 'https://via.placeholder.com/400x400?text=Sin+Imagen'

// Estados de orden
export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
} as const

// Etiquetas de estado de orden
export const ORDER_STATUS_LABELS: Record<string, string> = {
  pending: 'Pendiente',
  processing: 'Procesando',
  shipped: 'Enviado',
  delivered: 'Entregado',
  cancelled: 'Cancelado'
}

// Métodos de pago
export const PAYMENT_METHODS = [
  { value: 'credit_card', label: 'Tarjeta de Crédito' },
  { value: 'debit_card', label: 'Tarjeta de Débito' },
  { value: 'paypal', label: 'PayPal' },
  { value: 'transfer', label: 'Transferencia Bancaria' }
]

// Duración de notificaciones (ms)
export const TOAST_DURATION = {
  SUCCESS: 3000,
  ERROR: 5000,
  WARNING: 4000,
  INFO: 3000
}

// Regex patterns
export const PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^(\+52)?[\s\-]?(\d{2,3})[\s\-]?(\d{3,4})[\s\-]?(\d{4})$/,
  POSTAL_CODE: /^\d{5}$/,
  CREDIT_CARD: /^\d{13,19}$/,
  CVV: /^\d{3,4}$/
}

// Estados de México
export const MEXICO_STATES = [
  'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche',
  'Chiapas', 'Chihuahua', 'Coahuila', 'Colima', 'Ciudad de México', 'Durango',
  'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'Estado de México', 'Michoacán',
  'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro',
  'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco',
  'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'
]

// Rangos de precios para filtros
export const PRICE_RANGES = [
  { label: 'Menos de $10,000', min: 0, max: 10000 },
  { label: '$10,000 - $25,000', min: 10000, max: 25000 },
  { label: '$25,000 - $50,000', min: 25000, max: 50000 },
  { label: '$50,000 - $75,000', min: 50000, max: 75000 },
  { label: 'Más de $75,000', min: 75000, max: Infinity }
]

// Categorías de productos
export const PRODUCT_CATEGORIES = [
  { id: 'laptops', name: 'Laptops', icon: '💻' },
  { id: 'gaming', name: 'Gaming', icon: '🎮' },
  { id: 'business', name: 'Business', icon: '💼' },
  { id: 'accessories', name: 'Accesorios', icon: '⌨️' },
  { id: 'components', name: 'Componentes', icon: '🔧' }
]

// Marcas principales
export const BRANDS = [
  'Apple', 'Dell', 'HP', 'Lenovo', 'ASUS', 'Acer', 
  'MSI', 'Microsoft', 'Razer', 'Alienware'
]

// Ordenamiento de productos
export const SORT_OPTIONS = [
  { value: 'newest', label: 'Más recientes' },
  { value: 'price-asc', label: 'Precio: Menor a Mayor' },
  { value: 'price-desc', label: 'Precio: Mayor a Menor' },
  { value: 'name', label: 'Nombre A-Z' },
  { value: 'rating', label: 'Mejor valorados' }
]

// Configuración de imágenes
export const IMAGE_CONFIG = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  THUMBNAIL_SIZE: 150,
  MEDIUM_SIZE: 600,
  LARGE_SIZE: 1200
}

// Rutas de la aplicación
export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/product/:id',
  CART: '/cart',
  CHECKOUT: '/checkout',
  DEALS: '/deals',
  CONTACT: '/contact',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  ORDERS: '/orders'
} as const
