# 🛒 E-Commerce Full Stack - Vue.js + Django + MongoDB

Proyecto completo de e-commerce con Vue.js en el frontend, Django REST Framework en el backend y MongoDB como base de datos.

## 📋 Stack Tecnológico

### Frontend
- **Vue.js 3** - Framework JavaScript progresivo
- **Vue Router** - Enrutamiento SPA
- **Pinia** - Gestión de estado
- **Axios** - Cliente HTTP
- **Vite** - Build tool
- **Cypress** - Testing E2E

### Backend
- **Django 5.2** - Framework web Python
- **Django REST Framework** - API REST
- **Djongo** - Integración MongoDB con Django ORM
- **Django CORS Headers** - Manejo de CORS
- **SimpleJWT** - Autenticación JWT
- **Pillow** - Procesamiento de imágenes

### Base de Datos
- **MongoDB** - Base de datos NoSQL (por configurar)
- **SQLite** - Base de datos por defecto (desarrollo)

## 🚀 Instalación y Configuración

### Requisitos Previos
- Python 3.12+
- Node.js 22.14+
- npm 10.9+
- MongoDB (opcional - se puede usar MongoDB Atlas)

### Backend (Django)

1. **Navegar al directorio backend:**
   ```bash
   cd backend
   ```

2. **Activar el entorno virtual:**
   ```bash
   source venv/bin/activate
   ```

3. **Instalar dependencias (si es necesario):**
   ```bash
   pip install -r requirements.txt
   ```

4. **Aplicar migraciones:**
   ```bash
   python manage.py migrate
   ```

5. **Crear superusuario (si aún no existe):**
   ```bash
   python manage.py createsuperuser
   ```

6. **Ejecutar servidor de desarrollo:**
   ```bash
   python manage.py runserver
   ```

   El backend estará disponible en: `http://localhost:8000`
   Panel de administración: `http://localhost:8000/admin`

### Frontend (Vue.js)

1. **Navegar al directorio frontend:**
   ```bash
   cd frontend/ecommerce-frontend
   ```

2. **Instalar dependencias (si es necesario):**
   ```bash
   npm install
   ```

3. **Ejecutar servidor de desarrollo:**
   ```bash
   npm run dev
   ```

   El frontend estará disponible en: `http://localhost:5173`

## 📁 Estructura del Proyecto

```
ecommerce-project/
├── backend/
│   ├── ecommerce_backend/      # Configuración principal de Django
│   │   ├── settings.py         # Configuración del proyecto
│   │   └── urls.py             # URLs principales
│   ├── products/               # App de productos
│   │   ├── models.py           # Modelos: Product, Category
│   │   ├── serializers.py      # Serializers DRF
│   │   ├── views.py            # ViewSets
│   │   └── urls.py             # URLs de productos
│   ├── users/                  # App de usuarios
│   │   └── models.py           # CustomUser model
│   ├── orders/                 # App de órdenes
│   │   └── models.py           # Order, OrderItem models
│   ├── cart/                   # App de carrito
│   │   └── models.py           # Cart, CartItem models
│   ├── manage.py               # Django CLI
│   └── requirements.txt        # Dependencias Python
│
└── frontend/
    └── ecommerce-frontend/
        ├── src/
        │   ├── services/       # Servicios API
        │   │   ├── api.js              # Cliente axios
        │   │   ├── productService.js   # Servicios de productos
        │   │   └── authService.js      # Servicios de auth
        │   ├── stores/         # Pinia stores
        │   │   ├── productStore.js     # Store de productos
        │   │   └── cartStore.js        # Store del carrito
        │   ├── views/          # Páginas/Vistas
        │   ├── components/     # Componentes reutilizables
        │   └── router/         # Configuración de rutas
        ├── package.json        # Dependencias npm
        └── .env               # Variables de entorno

```

## 🔌 API Endpoints

### Autenticación
- `POST /api/token/` - Obtener token JWT
- `POST /api/token/refresh/` - Refrescar token

### Productos
- `GET /api/products/products/` - Listar todos los productos
- `GET /api/products/products/:id/` - Obtener un producto
- `POST /api/products/products/` - Crear producto (requiere autenticación)
- `PUT /api/products/products/:id/` - Actualizar producto
- `DELETE /api/products/products/:id/` - Eliminar producto

### Categorías
- `GET /api/products/categories/` - Listar categorías
- `POST /api/products/categories/` - Crear categoría

## 🔧 Configuración de MongoDB

### Opción 1: MongoDB Local (requiere instalación en WSL)
1. Instalar MongoDB en WSL
2. Descomentar la configuración de MongoDB en `backend/ecommerce_backend/settings.py`
3. Comentar la configuración de SQLite

### Opción 2: MongoDB Atlas (Recomendado para WSL)
1. Crear cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crear un cluster gratuito
3. Obtener la cadena de conexión
4. Actualizar `settings.py`:
   ```python
   DATABASES = {
       'default': {
           'ENGINE': 'djongo',
           'NAME': 'ecommerce_db',
           'CLIENT': {
               'host': 'tu-cadena-de-conexion-mongodb-atlas',
           }
       }
   }
   ```

## 📝 Próximos Pasos

1. **Crear vistas Vue para:**
   - Listado de productos
   - Detalle de producto
   - Carrito de compras
   - Checkout
   - Login/Registro
   - Panel de usuario

2. **Implementar funcionalidades:**
   - Búsqueda y filtros de productos
   - Sistema de pagos (Stripe/PayPal)
   - Gestión de órdenes
   - Notificaciones en tiempo real
   - Subida de imágenes de productos

3. **Testing:**
   - Tests unitarios backend (pytest)
   - Tests E2E frontend (Cypress)

4. **Despliegue:**
   - Backend: Heroku, DigitalOcean, AWS
   - Frontend: Vercel, Netlify
   - Base de datos: MongoDB Atlas

## 👤 Credenciales de Administrador

- **Usuario:** admin
- **Email:** admin@ecommerce.com
- **Contraseña:** (la que configuraste al crear el superusuario)

## 🛠️ Comandos Útiles

### Backend
```bash
# Crear nueva app
python manage.py startapp nombre_app

# Crear migraciones
python manage.py makemigrations

# Aplicar migraciones
python manage.py migrate

# Crear superusuario
python manage.py createsuperuser

# Shell interactivo
python manage.py shell
```

### Frontend
```bash
# Desarrollo
npm run dev

# Build producción
npm run build

# Vista previa build
npm run preview

# Linter
npm run lint

# Tests E2E
npm run test:e2e

# Tests unitarios
npm run test:unit
```

## 📚 Recursos

- [Documentación Django](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [Documentación Vue.js](https://vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)
- [MongoDB](https://docs.mongodb.com/)

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.
