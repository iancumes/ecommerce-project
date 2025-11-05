<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ProductCard from '@/components/ProductCard.vue'
import { FunnelIcon, Squares2X2Icon, ListBulletIcon } from '@heroicons/vue/24/outline'

const route = useRoute()

const viewMode = ref<'grid' | 'list'>('grid')
const selectedCategory = ref('all')
const selectedBrand = ref('all')
const priceRange = ref([0, 100000])
const sortBy = ref('newest')
const searchQuery = ref((route.query.search as string) || '')

// Datos dummy ampliados
const allProducts = ref([
  {
    id: 1,
    name: 'MacBook Pro 16" M3 Max - 36GB RAM - 1TB SSD',
    price: 59999,
    discount: 10,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600',
    category: 'Laptops',
    brand: 'Apple',
    rating: 5,
    reviews: 234,
    inStock: true
  },
  {
    id: 2,
    name: 'Dell XPS 15 Intel Core i9 13th Gen - 32GB - 1TB',
    price: 45999,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600',
    category: 'Laptops',
    brand: 'Dell',
    rating: 4,
    reviews: 187,
    inStock: true
  },
  {
    id: 3,
    name: 'ASUS ROG Strix G16 RTX 4070 Gaming Laptop',
    price: 39999,
    discount: 15,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600',
    category: 'Gaming',
    brand: 'ASUS',
    rating: 5,
    reviews: 412,
    inStock: true
  },
  {
    id: 4,
    name: 'Lenovo ThinkPad X1 Carbon Gen 11 - Intel vPro',
    price: 35999,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600',
    category: 'Business',
    brand: 'Lenovo',
    rating: 4,
    reviews: 156,
    inStock: true
  },
  {
    id: 5,
    name: 'HP Spectre x360 2-in-1 Convertible 14"',
    price: 42999,
    discount: 12,
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600',
    category: 'Laptops',
    brand: 'HP',
    rating: 4,
    reviews: 98,
    inStock: true
  },
  {
    id: 6,
    name: 'MSI Titan GT77 HX 13V Intel Core i9 RTX 4090',
    price: 89999,
    discount: 8,
    image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=600',
    category: 'Gaming',
    brand: 'MSI',
    rating: 5,
    reviews: 276,
    inStock: true
  },
  {
    id: 7,
    name: 'Acer Predator Helios 16 Gaming Laptop',
    price: 34999,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600',
    category: 'Gaming',
    brand: 'Acer',
    rating: 4,
    reviews: 198,
    inStock: true
  },
  {
    id: 8,
    name: 'Surface Laptop 5 - 13.5" Touchscreen',
    price: 32999,
    discount: 10,
    image: 'https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?w=600',
    category: 'Business',
    brand: 'Microsoft',
    rating: 4,
    reviews: 145,
    inStock: true
  },
])

const categories = ['all', 'Laptops', 'Gaming', 'Business']
const brands = ['all', 'Apple', 'Dell', 'ASUS', 'Lenovo', 'HP', 'MSI', 'Acer', 'Microsoft']

const filteredProducts = computed(() => {
  let filtered = allProducts.value

  // Filtrar por categoría
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(p => p.category === selectedCategory.value)
  }

  // Filtrar por marca
  if (selectedBrand.value !== 'all') {
    filtered = filtered.filter(p => p.brand === selectedBrand.value)
  }

  // Filtrar por rango de precio
  filtered = filtered.filter(p => {
    const price = p.discount ? p.price * (1 - p.discount / 100) : p.price
    return price >= (priceRange.value[0] ?? 0) && price <= (priceRange.value[1] ?? 100000)
  })

  // Filtrar por búsqueda
  if (searchQuery.value) {
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  // Ordenar
  switch (sortBy.value) {
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price)
      break
    case 'name':
      filtered.sort((a, b) => a.name.localeCompare(b.name))
      break
    case 'rating':
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
      break
  }

  return filtered
})

const clearFilters = () => {
  selectedCategory.value = 'all'
  selectedBrand.value = 'all'
  priceRange.value = [0, 100000]
  sortBy.value = 'newest'
  searchQuery.value = ''
}
</script>

<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Page Header -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 class="text-3xl font-bold mb-2">Catálogo de Productos</h1>
        <p class="text-gray-600">{{ filteredProducts.length }} productos encontrados</p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid lg:grid-cols-4 gap-8">
        <!-- Filters Sidebar -->
        <aside class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-lg font-bold flex items-center space-x-2">
                <FunnelIcon class="w-5 h-5" />
                <span>Filtros</span>
              </h2>
              <button 
                @click="clearFilters"
                class="text-sm text-gray-600 hover:text-black"
              >
                Limpiar
              </button>
            </div>

            <!-- Category Filter -->
            <div class="mb-6">
              <h3 class="font-semibold mb-3">Categoría</h3>
              <div class="space-y-2">
                <label 
                  v-for="cat in categories" 
                  :key="cat"
                  class="flex items-center space-x-2 cursor-pointer hover:text-gray-600"
                >
                  <input 
                    type="radio" 
                    :value="cat"
                    v-model="selectedCategory"
                    class="w-4 h-4 text-black focus:ring-black"
                  />
                  <span class="text-sm">{{ cat === 'all' ? 'Todas' : cat }}</span>
                </label>
              </div>
            </div>

            <!-- Brand Filter -->
            <div class="mb-6">
              <h3 class="font-semibold mb-3">Marca</h3>
              <div class="space-y-2">
                <label 
                  v-for="brand in brands" 
                  :key="brand"
                  class="flex items-center space-x-2 cursor-pointer hover:text-gray-600"
                >
                  <input 
                    type="radio" 
                    :value="brand"
                    v-model="selectedBrand"
                    class="w-4 h-4 text-black focus:ring-black"
                  />
                  <span class="text-sm">{{ brand === 'all' ? 'Todas' : brand }}</span>
                </label>
              </div>
            </div>

            <!-- Price Range -->
            <div class="mb-6">
              <h3 class="font-semibold mb-3">Rango de Precio</h3>
              <div class="space-y-3">
                <input 
                  type="range" 
                  min="0" 
                  max="100000" 
                  step="1000"
                  v-model.number="priceRange[1]"
                  class="w-full"
                />
                <div class="flex items-center justify-between text-sm text-gray-600">
                  <span>${{ (priceRange[0] ?? 0).toLocaleString() }}</span>
                  <span>${{ (priceRange[1] ?? 100000).toLocaleString() }}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <!-- Products Grid -->
        <div class="lg:col-span-3">
          <!-- Toolbar -->
          <div class="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <!-- Sort -->
              <div class="flex items-center space-x-3">
                <label class="text-sm font-medium">Ordenar por:</label>
                <select 
                  v-model="sortBy"
                  class="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
                >
                  <option value="newest">Más recientes</option>
                  <option value="price-asc">Precio: Menor a Mayor</option>
                  <option value="price-desc">Precio: Mayor a Menor</option>
                  <option value="name">Nombre A-Z</option>
                  <option value="rating">Mejor valorados</option>
                </select>
              </div>

              <!-- View Mode -->
              <div class="flex items-center space-x-2">
                <button 
                  @click="viewMode = 'grid'"
                  class="p-2 rounded-lg transition-colors"
                  :class="viewMode === 'grid' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
                >
                  <Squares2X2Icon class="w-5 h-5" />
                </button>
                <button 
                  @click="viewMode = 'list'"
                  class="p-2 rounded-lg transition-colors"
                  :class="viewMode === 'list' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
                >
                  <ListBulletIcon class="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <!-- Products -->
          <div 
            v-if="filteredProducts.length > 0"
            :class="viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6' 
              : 'space-y-4'"
          >
            <ProductCard 
              v-for="product in filteredProducts" 
              :key="product.id"
              :product="product"
            />
          </div>

          <!-- No Results -->
          <div 
            v-else
            class="bg-white rounded-lg shadow-sm p-12 text-center"
          >
            <div class="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <FunnelIcon class="w-10 h-10 text-gray-400" />
            </div>
            <h3 class="text-xl font-bold mb-2">No se encontraron productos</h3>
            <p class="text-gray-600 mb-6">Intenta ajustar tus filtros o realizar otra búsqueda</p>
            <button 
              @click="clearFilters"
              class="btn-primary"
            >
              Limpiar filtros
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
