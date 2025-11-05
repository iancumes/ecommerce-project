<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
import {
  ShoppingCartIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  HeartIcon
} from '@heroicons/vue/24/outline'

const router = useRouter()
const route = useRoute()
const cartStore = useCartStore()

const mobileMenuOpen = ref(false)
const searchQuery = ref('')

const navigation = [
  { name: 'Inicio', href: '/' },
  { name: 'Productos', href: '/products' },
  { name: 'Ofertas', href: '/deals' },
  { name: 'Contacto', href: '/contact' },
]

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/products', query: { search: searchQuery.value } })
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- Header -->
    <header class="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <!-- Top Bar -->
      <div class="bg-black text-white py-2">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p class="text-center text-sm font-medium">
            🚀 Envío gratis en compras mayores a $1,000 | 🎁 12 meses sin intereses
          </p>
        </div>
      </div>

      <!-- Main Header -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          <!-- Logo -->
          <div class="flex items-center cursor-pointer" @click="router.push('/')">
            <div class="flex items-center space-x-2">
              <div class="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-xl">TC</span>
              </div>
              <span class="text-2xl font-bold gradient-text hidden sm:block">TechComputers</span>
            </div>
          </div>

          <!-- Search Bar (Desktop) -->
          <div class="hidden md:flex flex-1 max-w-2xl mx-8">
            <div class="relative w-full">
              <input
                v-model="searchQuery"
                @keyup.enter="handleSearch"
                type="text"
                placeholder="Buscar laptops, componentes, accesorios..."
                class="w-full px-4 py-2.5 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
              <MagnifyingGlassIcon 
                class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              />
            </div>
          </div>

          <!-- Right Icons -->
          <div class="flex items-center space-x-4">
            <!-- Wishlist -->
            <button class="hidden sm:flex items-center space-x-1 hover:text-gray-600 transition-colors">
              <HeartIcon class="w-6 h-6" />
            </button>

            <!-- User -->
            <button class="hidden sm:flex items-center space-x-1 hover:text-gray-600 transition-colors">
              <UserIcon class="w-6 h-6" />
            </button>

            <!-- Cart -->
            <button 
              @click="router.push('/cart')"
              class="relative flex items-center space-x-1 hover:text-gray-600 transition-colors group"
            >
              <ShoppingCartIcon class="w-6 h-6" />
              <span 
                v-if="cartStore.totalItems > 0"
                class="absolute -top-2 -right-2 bg-black text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center group-hover:scale-110 transition-transform"
              >
                {{ cartStore.totalItems }}
              </span>
            </button>

            <!-- Mobile Menu Button -->
            <button 
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Bars3Icon v-if="!mobileMenuOpen" class="w-6 h-6" />
              <XMarkIcon v-else class="w-6 h-6" />
            </button>
          </div>
        </div>

        <!-- Navigation (Desktop) -->
        <nav class="hidden md:flex items-center space-x-8 pb-4">
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="text-sm font-medium hover:text-gray-600 transition-colors border-b-2 border-transparent hover:border-black pb-1"
            :class="{ 'border-black': route.path === item.href }"
          >
            {{ item.name }}
          </router-link>
        </nav>
      </div>

      <!-- Mobile Menu -->
      <div 
        v-if="mobileMenuOpen"
        class="md:hidden border-t border-gray-200 bg-white animate-slide-down"
      >
        <!-- Mobile Search -->
        <div class="px-4 py-3 border-b border-gray-200">
          <div class="relative">
            <input
              v-model="searchQuery"
              @keyup.enter="handleSearch"
              type="text"
              placeholder="Buscar productos..."
              class="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            <MagnifyingGlassIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        <!-- Mobile Navigation -->
        <div class="px-4 py-2 space-y-1">
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            @click="mobileMenuOpen = false"
            class="block px-3 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            :class="{ 'bg-gray-100': route.path === item.href }"
          >
            {{ item.name }}
          </router-link>
        </div>

        <!-- Mobile User Actions -->
        <div class="px-4 py-3 border-t border-gray-200 space-y-2">
          <button class="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
            <UserIcon class="w-5 h-5" />
            <span>Mi cuenta</span>
          </button>
          <button class="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
            <HeartIcon class="w-5 h-5" />
            <span>Favoritos</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="bg-black text-white mt-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Company Info -->
          <div class="col-span-1">
            <div class="flex items-center space-x-2 mb-4">
              <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span class="text-black font-bold text-xl">TC</span>
              </div>
              <span class="text-xl font-bold">TechComputers</span>
            </div>
            <p class="text-gray-400 text-sm">
              Tu tienda especializada en computadoras y tecnología de última generación.
            </p>
          </div>

          <!-- Quick Links -->
          <div>
            <h3 class="font-bold mb-4">Enlaces Rápidos</h3>
            <ul class="space-y-2 text-sm text-gray-400">
              <li><a href="#" class="hover:text-white transition-colors">Sobre Nosotros</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Productos</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Ofertas</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          <!-- Support -->
          <div>
            <h3 class="font-bold mb-4">Soporte</h3>
            <ul class="space-y-2 text-sm text-gray-400">
              <li><a href="#" class="hover:text-white transition-colors">Centro de Ayuda</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Envíos</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Devoluciones</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Garantías</a></li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h3 class="font-bold mb-4">Contacto</h3>
            <ul class="space-y-2 text-sm text-gray-400">
              <li>📧 info@techcomputers.com</li>
              <li>📱 +52 55 1234 5678</li>
              <li>📍 CDMX, México</li>
            </ul>
          </div>
        </div>

        <div class="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 TechComputers. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.gradient-text {
  background: linear-gradient(135deg, #000000 0%, #434343 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
