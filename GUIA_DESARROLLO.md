# 🎯 Guía Paso a Paso - Desarrollo E-Commerce

## ✅ Estado Actual del Proyecto

### Backend (Django)
- ✅ Proyecto Django configurado
- ✅ Apps creadas: products, users, orders, cart
- ✅ Modelos definidos para todas las apps
- ✅ Django REST Framework configurado
- ✅ CORS habilitado
- ✅ JWT Authentication configurado
- ✅ Base de datos SQLite activa
- ✅ Panel de administración accesible
- ✅ Superusuario creado

### Frontend (Vue.js)
- ✅ Proyecto Vue 3 con Vite
- ✅ Vue Router configurado
- ✅ Pinia (state management) configurado
- ✅ Axios instalado
- ✅ Services creados (API, Products, Auth)
- ✅ Stores creados (Products, Cart)
- ✅ Variables de entorno configuradas

### Servidores
- ✅ Backend: http://localhost:8000
- ✅ Frontend: http://localhost:5173
- ✅ Admin Panel: http://localhost:8000/admin

---

## 🔄 Flujo de Trabajo Diario

### 1. Iniciar los Servidores

**Terminal 1 - Backend:**
```bash
cd /var/www/html/ecommerce-project/backend
source venv/bin/activate
python manage.py runserver
```

**Terminal 2 - Frontend:**
```bash
cd /var/www/html/ecommerce-project/frontend/ecommerce-frontend
npm run dev
```

---

## 📝 Próximas Tareas de Desarrollo

### Fase 1: Completar el Backend

#### 1. Serializers y Views para Users, Orders y Cart

**users/serializers.py:**
```python
from rest_framework import serializers
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 
                  'phone', 'address', 'city', 'postal_code', 'country']
        extra_kwargs = {'password': {'write_only': True}}

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password', 'first_name', 'last_name']
    
    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user
```

**users/views.py:**
```python
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import CustomUser
from .serializers import UserSerializer, UserRegistrationSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    
    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [IsAuthenticated()]
    
    @action(detail=False, methods=['get'])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)
```

**users/urls.py:**
```python
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
```

#### 2. Agregar URLs de Users en urls.py principal
```python
# ecommerce_backend/urls.py
urlpatterns = [
    # ... existentes
    path('api/users/', include('users.urls')),
]
```

#### 3. Registrar modelos en admin.py

**users/admin.py:**
```python
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    list_display = ['username', 'email', 'first_name', 'last_name', 'is_staff']
    fieldsets = UserAdmin.fieldsets + (
        ('Información Adicional', {'fields': ('phone', 'address', 'city', 'postal_code', 'country')}),
    )
```

**orders/admin.py:**
```python
from django.contrib import admin
from .models import Order, OrderItem

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'status', 'total_amount', 'created_at']
    list_filter = ['status', 'created_at']
    inlines = [OrderItemInline]
```

**cart/admin.py:**
```python
from django.contrib import admin
from .models import Cart, CartItem

class CartItemInline(admin.TabularInline):
    model = CartItem
    extra = 0

@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ['user', 'created_at', 'updated_at']
    inlines = [CartItemInline]
```

### Fase 2: Crear Componentes Vue

#### 1. Componente de Listado de Productos

**src/views/ProductList.vue:**
```vue
<script setup>
import { ref, onMounted } from 'vue'
import { useProductStore } from '@/stores/productStore'
import { useCartStore } from '@/stores/cartStore'

const productStore = useProductStore()
const cartStore = useCartStore()
const products = ref([])

onMounted(async () => {
  try {
    products.value = await productStore.fetchProducts()
  } catch (error) {
    console.error('Error al cargar productos:', error)
  }
})

const addToCart = (product) => {
  cartStore.addToCart(product)
  alert('Producto agregado al carrito')
}
</script>

<template>
  <div class="products-container">
    <h1>Productos</h1>
    <div class="products-grid">
      <div v-for="product in products" :key="product.id" class="product-card">
        <img :src="product.image || '/placeholder.jpg'" :alt="product.name">
        <h3>{{ product.name }}</h3>
        <p>{{ product.description }}</p>
        <p class="price">${{ product.price }}</p>
        <button @click="addToCart(product)" :disabled="!product.in_stock">
          {{ product.in_stock ? 'Agregar al Carrito' : 'Sin Stock' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
}

.product-card {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
}

.product-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
}

.price {
  font-size: 24px;
  font-weight: bold;
  color: #2c3e50;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
```

#### 2. Componente de Carrito

**src/views/Cart.vue:**
```vue
<script setup>
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()

const updateQuantity = (productId, quantity) => {
  cartStore.updateQuantity(productId, parseInt(quantity))
}

const removeItem = (productId) => {
  if (confirm('¿Eliminar este producto del carrito?')) {
    cartStore.removeFromCart(productId)
  }
}
</script>

<template>
  <div class="cart-container">
    <h1>Carrito de Compras</h1>
    
    <div v-if="cartStore.items.length === 0" class="empty-cart">
      <p>Tu carrito está vacío</p>
    </div>
    
    <div v-else>
      <div v-for="item in cartStore.items" :key="item.product.id" class="cart-item">
        <img :src="item.product.image || '/placeholder.jpg'" :alt="item.product.name">
        <div class="item-details">
          <h3>{{ item.product.name }}</h3>
          <p>${{ item.product.price }}</p>
        </div>
        <div class="quantity-controls">
          <input 
            type="number" 
            :value="item.quantity" 
            @change="(e) => updateQuantity(item.product.id, e.target.value)"
            min="1"
          >
        </div>
        <div class="subtotal">
          ${{ (item.product.price * item.quantity).toFixed(2) }}
        </div>
        <button @click="removeItem(item.product.id)" class="remove-btn">
          Eliminar
        </button>
      </div>
      
      <div class="cart-summary">
        <h2>Total: ${{ cartStore.totalPrice.toFixed(2) }}</h2>
        <button class="checkout-btn">Proceder al Pago</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  border-radius: 8px;
}

.cart-item img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
}

.item-details {
  flex: 1;
}

.cart-summary {
  margin-top: 30px;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
  text-align: right;
}

.checkout-btn {
  background-color: #42b983;
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
}
</style>
```

#### 3. Actualizar Router

**src/router/index.js:**
```javascript
import { createRouter, createWebHistory } from 'vue-router'
import ProductList from '@/views/ProductList.vue'
import Cart from '@/views/Cart.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ProductList
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
  ]
})

export default router
```

### Fase 3: Crear Datos de Prueba

Accede al panel de administración: http://localhost:8000/admin

1. **Crear Categorías:**
   - Electrónica
   - Ropa
   - Hogar
   - Deportes

2. **Crear Productos:**
   - Al menos 5-10 productos de prueba
   - Asignar categorías
   - Establecer precios y stock

---

## 🔐 Configuración de Python en VS Code

Para eliminar los errores de importación en VS Code:

1. Presiona `Ctrl + Shift + P`
2. Escribe: "Python: Select Interpreter"
3. Selecciona: `/var/www/html/ecommerce-project/backend/venv/bin/python`

---

## 📦 Instalación de MongoDB (Opcional)

### Opción 1: MongoDB Atlas (Recomendado)
1. Visita: https://www.mongodb.com/cloud/atlas
2. Crea una cuenta gratuita
3. Crea un cluster
4. Obtén la cadena de conexión
5. Actualiza `backend/ecommerce_backend/settings.py`

### Opción 2: MongoDB Local en WSL
```bash
# Importar clave pública
curl -fsSL https://pgp.mongodb.com/server-7.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
   --dearmor

# Agregar repositorio
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | \
   sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Instalar MongoDB
sudo apt-get update
sudo apt-get install -y mongodb-org

# Iniciar MongoDB
sudo systemctl start mongod
```

---

## 🎨 Mejoras Futuras

1. **UI/UX:**
   - Instalar Tailwind CSS o Bootstrap
   - Crear componentes reutilizables
   - Añadir animaciones

2. **Funcionalidades:**
   - Búsqueda y filtros
   - Paginación
   - Sistema de reviews
   - Wishlist
   - Comparación de productos

3. **Seguridad:**
   - Validación de formularios
   - Rate limiting
   - HTTPS en producción

4. **Performance:**
   - Lazy loading de imágenes
   - Caché de productos
   - Optimización de queries

---

## 📚 Recursos Útiles

- **Django REST Framework Tutorial:** https://www.django-rest-framework.org/tutorial/quickstart/
- **Vue 3 Composition API:** https://vuejs.org/guide/extras/composition-api-faq.html
- **Pinia Getting Started:** https://pinia.vuejs.org/getting-started.html
- **Tailwind CSS con Vue:** https://tailwindcss.com/docs/guides/vite

---

## ❓ Solución de Problemas Comunes

### Error: Puerto 8000 ya en uso
```bash
# Encuentra el proceso
lsof -i :8000
# Mata el proceso
kill -9 <PID>
```

### Error: Puerto 5173 ya en uso
```bash
# Encuentra el proceso
lsof -i :5173
# Mata el proceso
kill -9 <PID>
```

### Error: Migraciones
```bash
# Eliminar migraciones
find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
find . -path "*/migrations/*.pyc"  -delete

# Recrear base de datos
rm db.sqlite3
python manage.py makemigrations
python manage.py migrate
```

---

¡Buena suerte con tu proyecto! 🚀
