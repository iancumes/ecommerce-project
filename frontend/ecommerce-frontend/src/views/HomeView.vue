<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ProductCard from '@/components/ProductCard.vue'
import { 
  TruckIcon, 
  ShieldCheckIcon, 
  CreditCardIcon, 
  ChatBubbleLeftRightIcon,
  ChevronRightIcon,
  ComputerDesktopIcon,
  CpuChipIcon,
  DevicePhoneMobileIcon
} from '@heroicons/vue/24/outline'

const router = useRouter()

// Datos dummy de productos destacados
const featuredProducts = ref([
  {
    id: 1,
    name: 'MacBook Pro 16" M3 Max',
    price: 59999,
    discount: 10,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600',
    category: 'Laptops',
    rating: 5,
    reviews: 234,
    inStock: true
  },
  {
    id: 2,
    name: 'Dell XPS 15 Intel Core i9',
    price: 45999,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600',
    category: 'Laptops',
    rating: 4,
    reviews: 187,
    inStock: true
  },
  {
    id: 3,
    name: 'ASUS ROG Strix Gaming',
    price: 39999,
    discount: 15,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600',
    category: 'Gaming',
    rating: 5,
    reviews: 412,
    inStock: true
  },
  {
    id: 4,
    name: 'Lenovo ThinkPad X1 Carbon',
    price: 35999,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600',
    category: 'Business',
    rating: 4,
    reviews: 156,
    inStock: true
  }
])

const categories = ref([
  { name: 'Laptops Gaming', icon: ComputerDesktopIcon, count: 156, color: 'bg-red-50' },
  { name: 'Componentes', icon: CpuChipIcon, count: 234, color: 'bg-blue-50' },
  { name: 'Accesorios', icon: DevicePhoneMobileIcon, count: 89, color: 'bg-green-50' },
])

const features = [
  { 
    icon: TruckIcon, 
    title: 'Envío Gratis', 
    description: 'En compras mayores a $1,000' 
  },
  { 
    icon: ShieldCheckIcon, 
    title: 'Garantía Extendida', 
    description: 'Hasta 3 años en productos seleccionados' 
  },
  { 
    icon: CreditCardIcon, 
    title: '12 MSI', 
    description: 'Meses sin intereses en todas las compras' 
  },
  { 
    icon: ChatBubbleLeftRightIcon, 
    title: 'Soporte 24/7', 
    description: 'Atención personalizada siempre' 
  },
]
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      <div class="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="animate-fade-in">
            <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Las Mejores
              <span class="block bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
                Computadoras
              </span>
              del Mercado
            </h1>
            <p class="text-xl text-gray-300 mb-8">
              Descubre nuestra selección de laptops de alta gama, componentes profesionales y accesorios premium.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <button 
                @click="router.push('/products')"
                class="bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>Ver Productos</span>
                <ChevronRightIcon class="w-5 h-5" />
              </button>
              <button class="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105">
                Ofertas Especiales
              </button>
            </div>
          </div>

          <div class="relative animate-slide-up hidden md:block">
            <div class="relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800" 
                alt="Tech" 
                class="rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div class="absolute top-10 -right-10 w-72 h-72 bg-gray-700 rounded-full opacity-20 blur-3xl"></div>
            <div class="absolute -bottom-10 -left-10 w-72 h-72 bg-gray-600 rounded-full opacity-20 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="py-12 bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div 
            v-for="(feature, index) in features" 
            :key="index"
            class="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div class="flex-shrink-0 w-12 h-12 bg-black rounded-lg flex items-center justify-center">
              <component :is="feature.icon" class="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 mb-1">{{ feature.title }}</h3>
              <p class="text-sm text-gray-600">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="section-title">Explora por Categoría</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Encuentra exactamente lo que necesitas en nuestras categorías especializadas
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            v-for="category in categories" 
            :key="category.name"
            class="group cursor-pointer"
            @click="router.push('/products')"
          >
            <div class="card p-8 text-center">
              <div :class="category.color" class="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <component :is="category.icon" class="w-10 h-10 text-gray-700" />
              </div>
              <h3 class="text-xl font-bold mb-2">{{ category.name }}</h3>
              <p class="text-gray-600 text-sm">{{ category.count }} productos disponibles</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-12">
          <div>
            <h2 class="section-title mb-2">Productos Destacados</h2>
            <p class="text-gray-600">Lo mejor de nuestra selección premium</p>
          </div>
          <button 
            @click="router.push('/products')"
            class="hidden md:flex items-center space-x-2 text-black font-semibold hover:underline"
          >
            <span>Ver todos</span>
            <ChevronRightIcon class="w-5 h-5" />
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCard 
            v-for="product in featuredProducts" 
            :key="product.id"
            :product="product"
          />
        </div>

        <div class="text-center mt-8 md:hidden">
          <button 
            @click="router.push('/products')"
            class="btn-secondary"
          >
            Ver todos los productos
          </button>
        </div>
      </div>
    </section>

    <!-- Banner Promocional -->
    <section class="py-16 bg-gradient-to-r from-black to-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="text-white">
            <h2 class="text-4xl font-bold mb-4">
              Ofertas Especiales del Mes
            </h2>
            <p class="text-xl text-gray-300 mb-6">
              Hasta 30% de descuento en laptops gaming seleccionadas
            </p>
            <ul class="space-y-3 mb-8">
              <li class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-white rounded-full"></div>
                <span>Procesadores de última generación</span>
              </li>
              <li class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-white rounded-full"></div>
                <span>Tarjetas gráficas RTX 4000 series</span>
              </li>
              <li class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-white rounded-full"></div>
                <span>Pantallas de alta frecuencia</span>
              </li>
            </ul>
            <button class="bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
              Ver Ofertas
            </button>
          </div>

          <div class="relative">
            <img 
              src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800" 
              alt="Gaming Setup" 
              class="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="py-16 bg-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
          <h2 class="text-3xl font-bold mb-4">Mantente Actualizado</h2>
          <p class="text-gray-600 mb-8 max-w-2xl mx-auto">
            Suscríbete a nuestro newsletter y recibe ofertas exclusivas, lanzamientos y tips tecnológicos
          </p>
          <div class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="tu@email.com"
              class="input-field flex-1"
            />
            <button class="btn-primary whitespace-nowrap">
              Suscribirse
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.bg-grid-white\/\[0\.05\] {
  background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
}
</style>
