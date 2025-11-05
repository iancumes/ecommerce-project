# 🛍️ E-COMMERCE DE COMPUTADORAS

> Plataforma moderna de e-commerce desarrollada con **Vue.js 3**, **Django REST Framework** y **Tailwind CSS**

[![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=flat-square&logo=vercel)](https://ecommerce-computadoras.vercel.app)
[![Heroku](https://img.shields.io/badge/API-Heroku-purple?style=flat-square&logo=heroku)](https://ecommerce-api-computadoras.herokuapp.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

## ✨ Características

### 🎨 Frontend
- ✅ Interfaz moderna y elegante con **Tailwind CSS**
- ✅ Componentes reutilizables en **Vue 3 + TypeScript**
- ✅ Búsqueda y filtros avanzados
- ✅ Carrito de compras con persistencia
- ✅ Proceso de checkout en 3 pasos
- ✅ Diseño responsive (mobile-first)
- ✅ Animaciones suaves
- ✅ Sistema de notificaciones

### 🔌 Backend
- ✅ API REST con **Django REST Framework**
- ✅ Autenticación con **JWT**
- ✅ Manejo de productos, categorías y órdenes
- ✅ Panel de administración Django
- ✅ CORS configurado
- ✅ Validación en backend
- ✅ Listo para producción

### 🛡️ Seguridad
- ✅ Tokens JWT para autenticación
- ✅ Validación en frontend y backend
- ✅ CORS configurado
- ✅ Protección contra XSS
- ✅ Variables de entorno seguras

---

## 🚀 Inicio Rápido

### Requisitos Previos
- Node.js 16+
- Python 3.9+
- Git

### Instalación Local

**1. Clonar repositorio:**
```bash
git clone https://github.com/TU_USUARIO/ecommerce-computadoras.git
cd ecommerce-computadoras
```

**2. Configurar Backend:**
```bash
cd backend

# Crear entorno virtual
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Crear archivo .env
cp ../.env.example .env

# Hacer migraciones
python manage.py migrate

# Crear superusuario
python manage.py createsuperuser

# Iniciar servidor
python manage.py runserver
```

**3. Configurar Frontend:**
```bash
cd frontend/ecommerce-frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

**4. Acceder a la aplicación:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000/api
- Admin Django: http://localhost:8000/admin

---

## 📁 Estructura del Proyecto

```
ecommerce-computadoras/
├── backend/                          # Django API
│   ├── ecommerce_backend/           # Configuración principal
│   ├── products/                    # App de productos
│   ├── users/                       # App de usuarios
│   ├── orders/                      # App de órdenes
│   ├── cart/                        # App de carrito
│   ├── manage.py
│   ├── requirements.txt
│   ├── Procfile                     # Para Heroku
│   └── runtime.txt
│
├── frontend/
│   └── ecommerce-frontend/          # Vue 3 + Vite
│       ├── src/
│       │   ├── components/          # Componentes Vue
│       │   ├── composables/         # Composables
│       │   ├── services/            # Servicios API
│       │   ├── stores/              # Stores Pinia
│       │   ├── types/               # Tipos TypeScript
│       │   ├── utils/               # Utilidades
│       │   └── views/               # Vistas/Páginas
│       ├── package.json
│       └── vite.config.ts
│
├── vercel.json                      # Configuración Vercel
├── .vercelignore                    # Archivos a ignorar
├── .env.example                     # Plantilla de variables
├── DEPLOY_GUIDE.md                  # Guía de deployment
└── README.md                        # Este archivo
```

---

## 🌐 Desplegar en Producción

### Opción 1: Vercel + Heroku (Recomendado)

Sigue la **[GUÍA COMPLETA DE DEPLOYMENT](DEPLOY_GUIDE.md)**

**Pasos resumidos:**
1. Subir código a GitHub
2. Conectar Vercel con GitHub para el frontend
3. Conectar Heroku con GitHub para el backend
4. Configurar variables de entorno
5. Deployar automáticamente

### Opción 2: Otras plataformas

- **Netlify** - Para el frontend
- **Railway.app** - Para el backend
- **Render** - Para ambos
- **AWS/Google Cloud** - Para más control

---

## 📚 Documentación

| Archivo | Descripción |
|---------|-------------|
| [DEPLOY_GUIDE.md](DEPLOY_GUIDE.md) | Guía paso a paso para deployment |
| [ESTRUCTURA_OPTIMIZADA.md](ESTRUCTURA_OPTIMIZADA.md) | Arquitectura y estructura del proyecto |
| [API_ENDPOINTS.md](API_ENDPOINTS.md) | Referencia de endpoints de la API |
| [GUIA_DESARROLLO.md](GUIA_DESARROLLO.md) | Guía para agregar nuevas funcionalidades |
| [frontend/ESTRUCTURA.md](frontend/ecommerce-frontend/ESTRUCTURA.md) | Estructura del frontend |

---

## 🛠️ Comandos Disponibles

### Backend
```bash
cd backend
source venv/bin/activate

# Desarrollo
python manage.py runserver

# Migraciones
python manage.py makemigrations
python manage.py migrate

# Admin
python manage.py createsuperuser

# Shell
python manage.py shell
```

### Frontend
```bash
cd frontend/ecommerce-frontend

# Desarrollo
npm run dev

# Build producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

---

## 🎯 Roadmap

### v1.0 (Actual)
- ✅ Catálogo de productos
- ✅ Carrito de compras
- ✅ Checkout
- ✅ Autenticación JWT

### v1.1 (Próximo)
- ⏳ Sistema de pagos (Stripe/PayPal)
- ⏳ Reviews y ratings
- ⏳ Wishlist
- ⏳ Búsqueda avanzada

### v2.0
- ⏳ Panel de administración mejorado
- ⏳ Reportes y analytics
- ⏳ Sistema de notificaciones
- ⏳ Integración con servicios de envío

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 👤 Autor

**Tu Nombre**
- GitHub: [@tuusuario](https://github.com/tuusuario)
- Email: tu.email@example.com

---

## 🙏 Agradecimientos

- [Vue.js](https://vuejs.org/) - Framework frontend
- [Django](https://www.djangoproject.com/) - Framework backend
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Vercel](https://vercel.com/) - Hosting frontend
- [Heroku](https://www.heroku.com/) - Hosting backend

---

## 📞 Soporte

Para reportar bugs o sugerencias, abre un [issue](https://github.com/TU_USUARIO/ecommerce-computadoras/issues)

---

<div align="center">

**⭐ Si te gustó el proyecto, por favor dale una estrella! ⭐**

[Visitar Sitio Web](https://ecommerce-computadoras.vercel.app) • [GitHub](https://github.com/TU_USUARIO/ecommerce-computadoras) • [Reportar Bug](https://github.com/TU_USUARIO/ecommerce-computadoras/issues)

</div>
