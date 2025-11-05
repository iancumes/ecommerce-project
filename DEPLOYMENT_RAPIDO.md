# 🚀 RESUMEN PASO A PASO - DEPLOYMENT EN 15 MINUTOS

> Guía rápida para desplegar tu e-commerce en Vercel y Heroku

---

## 📋 VERIFICACIÓN PRE-REQUISITOS

Tienes estos archivos listos:

✅ `vercel.json` - Configuración para Vercel
✅ `.vercelignore` - Archivos a ignorar en Vercel
✅ `Procfile` - Configuración para Heroku
✅ `requirements.txt` - Dependencias Python actualizadas
✅ `.env.example` - Plantilla de variables de entorno
✅ `DEPLOY_GUIDE.md` - Guía completa (referencia)
✅ `deploy-helper.sh` - Script interactivo

---

## 🎯 RESUMEN VISUAL - 5 PASOS PRINCIPALES

```
┌─────────────────────────────────────────────────────────────────┐
│  PASO 1: GITHUB                                                 │
│  └─ Crear repo + Push código                                    │
│                                                                 │
│  PASO 2: VERCEL (Frontend)                                      │
│  └─ Conectar GitHub → Deploy automático                         │
│                                                                 │
│  PASO 3: HEROKU (Backend)                                       │
│  └─ Crear app → Conectar GitHub → Deploy automático            │
│                                                                 │
│  PASO 4: VARIABLES DE ENTORNO                                   │
│  └─ Agregar en Vercel y Heroku                                  │
│                                                                 │
│  PASO 5: VERIFICACIÓN                                           │
│  └─ Probar URLs y admin                                         │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔥 PASO A PASO RÁPIDO

### PASO 1️⃣: CREAR REPOSITORIO GITHUB (5 min)

**En GitHub (navegador):**

1. Ve a https://github.com/new
2. **Repository name:** `ecommerce-computadoras`
3. **Visibility:** Public
4. Click **Create repository**
5. **Copia la URL** que te muestra

**En terminal:**

```bash
cd /var/www/html/ecommerce-project

# Configurar git (si no lo hiciste)
git config user.email "tu-email@example.com"
git config user.name "Tu Nombre"

# Agregar remote
git remote add origin https://github.com/TU_USUARIO/ecommerce-computadoras.git

# Cambiar a rama main
git branch -M main

# Verificar
git remote -v
```

**Hacer push:**

```bash
git push -u origin main
```

> Se te pedirá autenticación. Usa tu **token personal** como contraseña o **SSH key**.

**Resultado:**
✅ Tu código está en GitHub: https://github.com/TU_USUARIO/ecommerce-computadoras

---

### PASO 2️⃣: DESPLEGAR EN VERCEL - Frontend (5 min)

**En Vercel (navegador):**

1. Ve a https://vercel.com/dashboard
2. Click **Add New...** → **Project**
3. Click **Continue with GitHub**
4. **Selecciona** `ecommerce-computadoras`
5. Click **Import**

**Configurar:**

| Campo | Valor |
|-------|-------|
| **Framework Preset** | Vue.js |
| **Root Directory** | `frontend/ecommerce-frontend` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |

6. Click **Deploy**

⏳ Espera 5-10 minutos...

**Resultado:**
✅ Tu frontend está en: https://ecommerce-computadoras.vercel.app

---

### PASO 3️⃣: DESPLEGAR EN HEROKU - Backend (5 min)

**En Heroku (navegador):**

1. Ve a https://dashboard.heroku.com/apps
2. Click **New** → **Create new app**
3. **App name:** `ecommerce-api-computadoras`
4. **Region:** Selecciona la más cercana
5. Click **Create app**

**Conectar con GitHub:**

6. Tab **Deploy**
7. **Deployment method:** GitHub
8. Click **Connect to GitHub**
9. Busca y selecciona `ecommerce-computadoras`
10. Click **Connect**

**Activar auto-deploy:**

11. Sección **Automatic deploys**
12. Click **Enable Automatic Deploys**
13. Click **Deploy Branch**

⏳ Espera a que termine el build...

**Resultado:**
✅ Tu backend está en: https://ecommerce-api-computadoras.herokuapp.com

---

### PASO 4️⃣: AGREGAR VARIABLES DE ENTORNO (3 min)

#### En Vercel:

1. Tu proyecto en Vercel
2. **Settings** → **Environment Variables**
3. Agrega:

```
VITE_API_URL = https://ecommerce-api-computadoras.herokuapp.com/api
```

4. Click **Save**
5. **Deployments** → Click en el último
6. Click los 3 puntos → **Redeploy**

#### En Heroku:

1. Tu app en Heroku
2. **Settings** → **Reveal Config Vars**
3. Agrega:

```
DEBUG = False
SECRET_KEY = (genera uno seguro - ver abajo)
ALLOWED_HOSTS = ecommerce-api-computadoras.herokuapp.com,localhost,127.0.0.1
CORS_ALLOWED_ORIGINS = https://ecommerce-computadoras.vercel.app
```

4. Presiona Enter después de cada variable
5. Tu app se redeploya automáticamente

**Para generar SECRET_KEY:**

```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

O usa: https://djecrety.ir/

---

### PASO 5️⃣: EJECUTAR MIGRACIONES EN HEROKU (2 min)

**Si tienes Heroku CLI instalada:**

```bash
heroku login
heroku run -a ecommerce-api-computadoras "python manage.py migrate"
heroku run -a ecommerce-api-computadoras "python manage.py createsuperuser"
```

**Si no tienes CLI:**

1. Heroku Dashboard → Tu app
2. Click el ícono ⋯ (arriba derecha)
3. Click **Run console**
4. Ejecuta:

```
python manage.py migrate
python manage.py createsuperuser
```

> Te pedirá username y password - **recuerda estos datos!**

---

## ✅ VERIFICACIÓN FINAL

### Probar Frontend:

1. Abre: https://ecommerce-computadoras.vercel.app
2. Presiona F12 → **Console** (verifica que no haya errores rojos)
3. Navega entre páginas
4. Intenta agregar un producto al carrito

### Probar Backend:

1. Abre: https://ecommerce-api-computadoras.herokuapp.com/api
2. Debería mostrar la API
3. Abre: https://ecommerce-api-computadoras.herokuapp.com/admin
4. Login con las credenciales que creaste

### Si algo no funciona:

**Error CORS:**
- Heroku → Settings → Config Vars
- Verifica `CORS_ALLOWED_ORIGINS`

**Error 502 Bad Gateway:**
```bash
heroku logs --tail -a ecommerce-api-computadoras
```

**Frontend no ve la API:**
- Vercel → Settings → Environment Variables
- Verifica `VITE_API_URL`

---

## 🎉 ¡FELICITACIONES!

Tu e-commerce está en línea:

- 🌐 **Frontend:** https://ecommerce-computadoras.vercel.app
- 🔌 **Backend API:** https://ecommerce-api-computadoras.herokuapp.com/api
- 🛠️ **Admin:** https://ecommerce-api-computadoras.herokuapp.com/admin

---

## 📞 CHEAT SHEET - COMANDOS ÚTILES

```bash
# Ver estado del repositorio
git status

# Hacer cambios y push
git add .
git commit -m "Descripción de cambios"
git push

# Ver logs en Heroku
heroku logs --tail -a ecommerce-api-computadoras

# Ejecutar comando en Heroku
heroku run -a ecommerce-api-computadoras "python manage.py shell"

# Reiniciar Heroku
heroku dyno:restart -a ecommerce-api-computadoras
```

---

## 📚 REFERENCIAS

- [DEPLOY_GUIDE.md](DEPLOY_GUIDE.md) - Guía completa y detallada
- [Vercel Docs](https://vercel.com/docs)
- [Heroku Docs](https://devcenter.heroku.com/)
- [Django Production](https://docs.djangoproject.com/en/5.2/howto/deployment/)

---

**¿Necesitas ayuda? Lee DEPLOY_GUIDE.md o abre un issue en GitHub** 🚀
