# 🚀 GUÍA COMPLETA DE DEPLOYMENT

## Desplegar E-Commerce en Vercel y Heroku

> Última actualización: Noviembre 2025

---

## 📋 PREREQUISITOS

Antes de comenzar, asegúrate de tener:

1. ✅ **Cuenta GitHub** - https://github.com/signup
2. ✅ **Cuenta Vercel** - https://vercel.com/signup
3. ✅ **Cuenta Heroku** - https://signup.heroku.com
4. ✅ **Git instalado** - https://git-scm.com/downloads

---

## 🔧 CONFIGURACIÓN INICIAL

### Paso 1: Clonar/Preparar el repositorio localmente

```bash
cd /var/www/html/ecommerce-project
git status
```

Si no tiene git inicializado:

```bash
git init
git add .
git commit -m "Initial commit: E-commerce de computadoras v1.0"
```

---

## 📤 SUBIR A GITHUB

### Paso 2: Crear repositorio en GitHub

1. Ve a https://github.com/new
2. Completa los campos:
   - **Repository name:** `ecommerce-computadoras`
   - **Description:** `E-commerce moderno de venta de computadoras con Vue.js y Django`
   - **Visibility:** Selecciona **Public**
   - **Initialize:** NO inicialices (porque ya tienes código local)
3. Click en **Create repository**

### Paso 3: Conectar repositorio local con GitHub

Reemplaza `TU_USUARIO` con tu usuario real de GitHub:

```bash
cd /var/www/html/ecommerce-project

# Agregar remote
git remote add origin https://github.com/TU_USUARIO/ecommerce-computadoras.git

# Cambiar rama a main (si no está)
git branch -M main

# Verificar remote
git remote -v
# Debería mostrar:
# origin  https://github.com/TU_USUARIO/ecommerce-computadoras.git (fetch)
# origin  https://github.com/TU_USUARIO/ecommerce-computadoras.git (push)
```

### Paso 4: Hacer push a GitHub

```bash
git push -u origin main
```

Se te pedirá autenticación. Usa uno de estos métodos:

**Opción A: Token Personal (Recomendado)**
1. GitHub Settings → Developer settings → Personal access tokens
2. Generar nuevo token con scope `repo`
3. Usar token como contraseña

**Opción B: SSH**
1. GitHub Settings → SSH and GPG keys
2. Agregar tu clave SSH pública
3. Configurar git para usar SSH

---

## 🎨 DEPLOYMENT EN VERCEL (Frontend)

### Paso 5: Conectar Vercel con GitHub

1. Ve a https://vercel.com/dashboard
2. Click en **Add New...** → **Project**
3. Click en **Continue with GitHub**
4. Selecciona el repositorio `ecommerce-computadoras`
5. Click en **Import**

### Paso 6: Configurar proyecto en Vercel

En la pantalla de configuración:

**Root Directory:** 
```
frontend/ecommerce-frontend
```

**Framework Preset:**
```
Vue.js
```

**Build Command:**
```
npm run build
```

**Output Directory:**
```
dist
```

**Install Command:**
```
npm install
```

### Paso 7: Agregar variables de entorno en Vercel

1. En la configuración del proyecto, busca **Environment Variables**
2. Agrega las siguientes variables:

```
VITE_API_URL = https://ecommerce-api-computadoras.herokuapp.com/api
VITE_APP_NAME = Computadoras Store
```

> **Nota:** Reemplaza `ecommerce-api-computadoras` con el nombre de tu app en Heroku

### Paso 8: Deploy en Vercel

1. Click en **Deploy**
2. Espera a que termine el build (5-10 minutos)
3. Verás un mensaje ✅ **Congratulations!**
4. Tu URL será: `https://ecommerce-computadoras.vercel.app`

---

## 🔌 DEPLOYMENT EN HEROKU (Backend)

### Paso 9: Crear app en Heroku

1. Ve a https://dashboard.heroku.com/apps
2. Click en **New** → **Create new app**
3. Completa:
   - **App name:** `ecommerce-api-computadoras`
   - **Region:** Elige la más cercana (Europe o US)
4. Click en **Create app**

### Paso 10: Conectar Heroku con GitHub

1. En tu app de Heroku, ve a **Deploy**
2. **Deployment method** → Selecciona **GitHub**
3. Click en **Connect to GitHub**
4. Busca `ecommerce-computadoras` y click en **Connect**
5. Abajo, en **Automatic deploys** → **Enable Automatic Deploys**

### Paso 11: Agregar variables de entorno en Heroku

1. En tu app, ve a **Settings**
2. Click en **Reveal Config Vars**
3. Agrega las siguientes variables:

```
DEBUG = False
SECRET_KEY = (genera uno seguro - ver instrucciones abajo)
ALLOWED_HOSTS = ecommerce-api-computadoras.herokuapp.com,localhost,127.0.0.1
CORS_ALLOWED_ORIGINS = https://ecommerce-computadoras.vercel.app,http://localhost:5173
```

**Para generar SECRET_KEY seguro:**

```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

O usa este generador: https://djecrety.ir/

### Paso 12: Agregar PostgreSQL en Heroku

Heroku proporciona PostgreSQL automáticamente, pero necesitas el add-on:

```bash
# Si tienes Heroku CLI instalada
heroku addons:create heroku-postgresql:hobby-dev --app ecommerce-api-computadoras

# Si no tienes CLI:
# En Heroku Dashboard:
# 1. Resources → Find more add-ons → Search "Postgres"
# 2. Selecciona "Heroku Postgres"
# 3. Select plan "Hobby Dev - Free"
```

### Paso 13: Deploy en Heroku

**Opción A: Automático (Recomendado)**
1. En Heroku Dashboard, click en **Deploy** 
2. En **Manual deploy**, busca tu rama `main`
3. Click en **Deploy Branch**
4. Espera a que termine

**Opción B: Con Heroku CLI**

```bash
# Instala Heroku CLI desde: https://devcenter.heroku.com/articles/heroku-cli

heroku login
heroku git:remote --app ecommerce-api-computadoras
git push heroku main
```

### Paso 14: Ejecutar migraciones en Heroku

```bash
# Con Heroku CLI
heroku run -a ecommerce-api-computadoras "python manage.py migrate"
heroku run -a ecommerce-api-computadoras "python manage.py createsuperuser"

# O en Heroku Dashboard:
# 1. Click en el ícono de más arriba a la derecha
# 2. Selecciona "Run console"
# 3. Escribe: python manage.py migrate
# 4. Escribe: python manage.py createsuperuser
```

---

## ✅ VERIFICACIÓN FINAL

### Paso 15: Verificar que todo funciona

**Frontend (Vercel):**
```
https://ecommerce-computadoras.vercel.app
```

**Backend API (Heroku):**
```
https://ecommerce-api-computadoras.herokuapp.com/api
```

**Admin Django (Heroku):**
```
https://ecommerce-api-computadoras.herokuapp.com/admin
```

### Paso 16: Pruebas rápidas

1. **Abre el frontend** en https://ecommerce-computadoras.vercel.app
2. **Verifica la consola** (F12 → Console) que no hay errores
3. **Prueba a navegar** entre páginas
4. **Intenta agregar un producto** al carrito
5. **Abre admin** en https://ecommerce-api-computadoras.herokuapp.com/admin
6. **Login** con las credenciales que creaste

---

## 🔄 ACTUALIZACIONES FUTURAS

### Método 1: Automático (Recomendado)

Cuando hagas cambios:

```bash
git add .
git commit -m "Descripción de cambios"
git push origin main
```

**Vercel** y **Heroku** desplegará automáticamente en 2-5 minutos.

### Método 2: Manual

**Para Vercel:**
1. En Vercel Dashboard, click en **Deployments**
2. Click en los 3 puntos del deployment
3. Click en **Redeploy**

**Para Heroku:**
```bash
heroku run -a ecommerce-api-computadoras "git pull"
```

---

## 🆘 TROUBLESHOOTING

### Error: "CORS policy: No 'Access-Control-Allow-Origin' header"

**Solución:**
1. Ve a Heroku Settings
2. Actualiza `CORS_ALLOWED_ORIGINS` con tu URL de Vercel
3. Deploy nuevamente

### Error: "502 Bad Gateway" en Heroku

**Solución:**
```bash
# Ver logs
heroku logs --tail -a ecommerce-api-computadoras

# Reiniciar dyno
heroku dyno:restart -a ecommerce-api-computadoras
```

### Error: "Module not found" en Vercel

**Solución:**
1. Asegúrate de que `requirements.txt` tiene todas las dependencias
2. En Vercel, actualiza:
   - **Build Command:** `cd frontend/ecommerce-frontend && npm install && npm run build`
   - **Output Directory:** `frontend/ecommerce-frontend/dist`

### Error: "Database connection error" en Heroku

**Solución:**
```bash
# Recrear la base de datos
heroku pg:reset DATABASE -a ecommerce-api-computadoras
heroku run -a ecommerce-api-computadoras "python manage.py migrate"
```

---

## 📊 MONITOREO

### Logs en Vercel

1. Dashboard → Tu proyecto
2. **Deployments** → Click en un deployment
3. **Logs** → Ver los logs de build

### Logs en Heroku

```bash
# Ver últimos 100 logs
heroku logs -a ecommerce-api-computadoras

# Ver logs en tiempo real
heroku logs --tail -a ecommerce-api-computadoras

# Filtrar por tipo
heroku logs --dyno=web -a ecommerce-api-computadoras
```

---

## 🎉 ¡FELICITACIONES!

Tu aplicación está lista para producción. Ahora puedes:

- ✅ Compartir tu e-commerce con otros
- ✅ Agregar funcionalidades nuevas
- ✅ Monitorear el rendimiento
- ✅ Escalar conforme crece tu negocio

---

## 📞 REFERENCIAS ÚTILES

- [Vercel Documentation](https://vercel.com/docs)
- [Heroku Documentation](https://devcenter.heroku.com)
- [GitHub Pages](https://pages.github.com)
- [Django Deployment](https://docs.djangoproject.com/en/5.2/howto/deployment/)
- [Vue.js Deployment](https://vuejs.org/guide/ssr/build.html)

---

**¡Éxito con tu e-commerce! 🚀**
