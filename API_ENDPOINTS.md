# 📡 API Endpoints - E-Commerce Backend

Base URL: `http://localhost:8000/api`

## 🔐 Autenticación

### Obtener Token JWT
```http
POST /token/
Content-Type: application/json

{
    "username": "admin",
    "password": "tu_password"
}

Response:
{
    "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

### Refrescar Token
```http
POST /token/refresh/
Content-Type: application/json

{
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}

Response:
{
    "access": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

## 📦 Productos

### Listar todos los productos
```http
GET /products/products/
Authorization: Bearer {token}  # Opcional

Response:
[
    {
        "id": 1,
        "name": "Laptop",
        "description": "Laptop gaming de alta gama",
        "price": "1299.99",
        "category": 1,
        "category_name": "Electrónica",
        "stock": 10,
        "image": "http://localhost:8000/media/products/laptop.jpg",
        "is_active": true,
        "in_stock": true,
        "created_at": "2025-10-31T12:00:00Z",
        "updated_at": "2025-10-31T12:00:00Z"
    },
    ...
]
```

### Obtener un producto específico
```http
GET /products/products/{id}/
Authorization: Bearer {token}  # Opcional

Response:
{
    "id": 1,
    "name": "Laptop",
    "description": "Laptop gaming de alta gama",
    "price": "1299.99",
    "category": 1,
    "category_name": "Electrónica",
    "stock": 10,
    "image": "http://localhost:8000/media/products/laptop.jpg",
    "is_active": true,
    "in_stock": true,
    "created_at": "2025-10-31T12:00:00Z",
    "updated_at": "2025-10-31T12:00:00Z"
}
```

### Crear un producto (requiere autenticación)
```http
POST /products/products/
Authorization: Bearer {token}
Content-Type: multipart/form-data

{
    "name": "Nuevo Producto",
    "description": "Descripción del producto",
    "price": "99.99",
    "category": 1,
    "stock": 50,
    "image": <archivo>,
    "is_active": true
}

Response: 201 Created
{
    "id": 2,
    "name": "Nuevo Producto",
    ...
}
```

### Actualizar un producto
```http
PUT /products/products/{id}/
Authorization: Bearer {token}
Content-Type: application/json

{
    "name": "Producto Actualizado",
    "price": "89.99",
    "stock": 45
}

Response: 200 OK
{
    "id": 2,
    "name": "Producto Actualizado",
    ...
}
```

### Actualizar parcialmente un producto
```http
PATCH /products/products/{id}/
Authorization: Bearer {token}
Content-Type: application/json

{
    "price": "79.99"
}

Response: 200 OK
```

### Eliminar un producto
```http
DELETE /products/products/{id}/
Authorization: Bearer {token}

Response: 204 No Content
```

### Búsqueda de productos
```http
GET /products/products/?search=laptop
GET /products/products/?search=gaming

Response: Lista filtrada de productos
```

### Ordenar productos
```http
GET /products/products/?ordering=price         # Precio ascendente
GET /products/products/?ordering=-price        # Precio descendente
GET /products/products/?ordering=name          # Nombre A-Z
GET /products/products/?ordering=-created_at   # Más recientes primero
```

## 🏷️ Categorías

### Listar todas las categorías
```http
GET /products/categories/

Response:
[
    {
        "id": 1,
        "name": "Electrónica",
        "description": "Productos electrónicos",
        "created_at": "2025-10-31T12:00:00Z",
        "updated_at": "2025-10-31T12:00:00Z"
    },
    ...
]
```

### Obtener una categoría específica
```http
GET /products/categories/{id}/

Response:
{
    "id": 1,
    "name": "Electrónica",
    "description": "Productos electrónicos",
    "created_at": "2025-10-31T12:00:00Z",
    "updated_at": "2025-10-31T12:00:00Z"
}
```

### Crear una categoría (requiere autenticación)
```http
POST /products/categories/
Authorization: Bearer {token}
Content-Type: application/json

{
    "name": "Nueva Categoría",
    "description": "Descripción de la categoría"
}

Response: 201 Created
```

### Actualizar una categoría
```http
PUT /products/categories/{id}/
Authorization: Bearer {token}
Content-Type: application/json

{
    "name": "Categoría Actualizada",
    "description": "Nueva descripción"
}

Response: 200 OK
```

### Eliminar una categoría
```http
DELETE /products/categories/{id}/
Authorization: Bearer {token}

Response: 204 No Content
```

## 🔧 Parámetros de Query Comunes

### Paginación (por implementar)
```http
GET /products/products/?page=1&page_size=10
```

### Filtros combinados
```http
GET /products/products/?search=laptop&ordering=-price
GET /products/products/?category=1&ordering=name
```

## 📋 Códigos de Estado HTTP

- `200 OK` - Solicitud exitosa
- `201 Created` - Recurso creado exitosamente
- `204 No Content` - Solicitud exitosa sin contenido de respuesta
- `400 Bad Request` - Error en la solicitud
- `401 Unauthorized` - No autenticado
- `403 Forbidden` - No autorizado
- `404 Not Found` - Recurso no encontrado
- `500 Internal Server Error` - Error del servidor

## 🧪 Ejemplos con cURL

### Login
```bash
curl -X POST http://localhost:8000/api/token/ \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"tu_password"}'
```

### Listar productos
```bash
curl http://localhost:8000/api/products/products/
```

### Listar productos con autenticación
```bash
curl http://localhost:8000/api/products/products/ \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc..."
```

### Crear producto
```bash
curl -X POST http://localhost:8000/api/products/products/ \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Producto de Prueba",
    "description": "Descripción",
    "price": "99.99",
    "category": 1,
    "stock": 100
  }'
```

## 📱 Panel de Administración

URL: `http://localhost:8000/admin`

Desde aquí puedes:
- ✅ Gestionar usuarios
- ✅ Crear/editar productos
- ✅ Gestionar categorías
- ✅ Ver órdenes
- ✅ Administrar el sistema completo

---

## 🔮 Próximos Endpoints (Por Implementar)

### Users
- `POST /users/register/` - Registro de usuarios
- `GET /users/me/` - Perfil del usuario actual
- `PUT /users/me/` - Actualizar perfil

### Cart
- `GET /cart/` - Obtener carrito actual
- `POST /cart/items/` - Agregar item al carrito
- `PUT /cart/items/{id}/` - Actualizar cantidad
- `DELETE /cart/items/{id}/` - Eliminar item

### Orders
- `GET /orders/` - Listar órdenes del usuario
- `POST /orders/` - Crear nueva orden
- `GET /orders/{id}/` - Detalle de orden
- `PUT /orders/{id}/` - Actualizar estado de orden

---

**Nota:** Usa herramientas como Postman, Insomnia o Thunder Client para probar estos endpoints más fácilmente.
