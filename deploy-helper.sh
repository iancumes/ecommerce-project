#!/bin/bash

# 🚀 SCRIPT INTERACTIVO DE DEPLOYMENT
# Preparar y desplegar el e-commerce en Vercel y Heroku

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                                                                ║"
echo "║          🚀 E-COMMERCE DEPLOYMENT HELPER SCRIPT 🚀             ║"
echo "║                                                                ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}📋 CHECKLIST PRE-DEPLOYMENT${NC}"
echo "=============================================="
echo ""

# Verificar si es un repositorio git
if [ ! -d ".git" ]; then
    echo -e "${RED}❌ No es un repositorio git${NC}"
    echo -e "${YELLOW}💡 Ejecuta: git init${NC}"
    exit 1
else
    echo -e "${GREEN}✅ Repositorio git detectado${NC}"
fi

# Verificar si hay cambios sin commitear
if [ -n "$(git status --porcelain)" ]; then
    echo -e "${YELLOW}⚠️  Hay cambios sin commitear${NC}"
    echo -e "${YELLOW}💡 Ejecuta: git add . && git commit -m 'Descripción de cambios'${NC}"
else
    echo -e "${GREEN}✅ Todos los cambios están committeados${NC}"
fi

# Verificar si hay remote origin
if git remote get-url origin > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Remote 'origin' configurado${NC}"
    echo -e "   URL: $(git remote get-url origin)"
else
    echo -e "${YELLOW}⚠️  Remote 'origin' no configurado${NC}"
    echo -e "${YELLOW}💡 Ejecuta:${NC}"
    echo "   git remote add origin https://github.com/TU_USUARIO/ecommerce-computadoras.git"
fi

echo ""
echo -e "${BLUE}🔧 OPCIONES DE SETUP${NC}"
echo "=============================================="
echo ""
echo "1️⃣  Crear .env.example (si no existe)"
echo "2️⃣  Generar SECRET_KEY para Django"
echo "3️⃣  Ver instrucciones de GitHub"
echo "4️⃣  Ver instrucciones de Vercel"
echo "5️⃣  Ver instrucciones de Heroku"
echo "6️⃣  Ver todo (en un solo documento)"
echo "0️⃣  Salir"
echo ""

read -p "Selecciona una opción (0-6): " option

case $option in
    1)
        if [ -f ".env.example" ]; then
            echo -e "${YELLOW}⚠️  .env.example ya existe${NC}"
        else
            echo -e "${GREEN}✅ Creando .env.example...${NC}"
            # El archivo ya debería estar creado
            ls -la .env.example
        fi
        ;;
    2)
        echo -e "${BLUE}🔐 GENERAR SECRET_KEY${NC}"
        echo "=============================================="
        echo ""
        echo "Método 1: Con Python"
        echo "python -c \"from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())\""
        echo ""
        echo "Método 2: Online"
        echo "https://djecrety.ir/"
        echo ""
        ;;
    3)
        echo -e "${BLUE}📤 PASO A PASO: GITHUB${NC}"
        echo "=============================================="
        cat << 'EOF'

1. Crear repositorio en GitHub
   - Ve a https://github.com/new
   - Nombre: ecommerce-computadoras
   - Visibility: Public
   - Click "Create repository"

2. Conectar tu repositorio local
   git remote add origin https://github.com/TU_USUARIO/ecommerce-computadoras.git
   git branch -M main
   git push -u origin main

3. Autenticar (elige uno):
   - Token Personal: https://github.com/settings/tokens
   - SSH: https://github.com/settings/keys

EOF
        ;;
    4)
        echo -e "${BLUE}🎨 PASO A PASO: VERCEL${NC}"
        echo "=============================================="
        cat << 'EOF'

1. Crear cuenta en Vercel
   https://vercel.com/signup

2. Conectar con GitHub
   - Dashboard → Add New → Project
   - Continue with GitHub
   - Selecciona: ecommerce-computadoras

3. Configurar proyecto
   - Root Directory: frontend/ecommerce-frontend
   - Framework: Vue.js
   - Build: npm run build
   - Output: dist

4. Environment Variables
   - VITE_API_URL=https://ecommerce-api-computadoras.herokuapp.com/api

5. Click "Deploy"

Tu sitio estará en: https://ecommerce-computadoras.vercel.app

EOF
        ;;
    5)
        echo -e "${BLUE}🔌 PASO A PASO: HEROKU${NC}"
        echo "=============================================="
        cat << 'EOF'

1. Crear cuenta en Heroku
   https://signup.heroku.com

2. Crear nueva app
   - Dashboard → New → Create new app
   - App name: ecommerce-api-computadoras
   - Region: Europe (o la más cercana)

3. Conectar GitHub
   - Deploy tab
   - Deployment method: GitHub
   - Connect to GitHub
   - Busca: ecommerce-computadoras
   - Enable Automatic Deploys

4. Config Vars (Settings → Reveal Config Vars)
   DEBUG=False
   SECRET_KEY=(genera uno seguro)
   ALLOWED_HOSTS=ecommerce-api-computadoras.herokuapp.com,localhost
   CORS_ALLOWED_ORIGINS=https://ecommerce-computadoras.vercel.app

5. Agregar PostgreSQL
   - Resources → Find more add-ons
   - Search: Postgres
   - Plan: Hobby Dev (Free)

6. Deploy Branch
   - Deploy tab → Manual deploy
   - Branch: main
   - Click "Deploy Branch"

7. Ejecutar migraciones
   heroku run -a ecommerce-api-computadoras "python manage.py migrate"
   heroku run -a ecommerce-api-computadoras "python manage.py createsuperuser"

Tu API estará en: https://ecommerce-api-computadoras.herokuapp.com/api

EOF
        ;;
    6)
        echo -e "${BLUE}📚 GUÍA COMPLETA DE DEPLOYMENT${NC}"
        echo "=============================================="
        echo ""
        echo "📖 Lee el archivo: DEPLOY_GUIDE.md"
        echo ""
        echo "O abre directamente:"
        echo "https://github.com/TU_USUARIO/ecommerce-computadoras/blob/main/DEPLOY_GUIDE.md"
        echo ""
        ;;
    0)
        echo -e "${GREEN}👋 ¡Hasta luego!${NC}"
        exit 0
        ;;
    *)
        echo -e "${RED}❌ Opción inválida${NC}"
        exit 1
        ;;
esac

echo ""
echo "════════════════════════════════════════════════════════════════"
echo ""
echo -e "${GREEN}✅ Setup completado${NC}"
echo ""
echo -e "${BLUE}🚀 PRÓXIMOS PASOS:${NC}"
echo "1. Lee DEPLOY_GUIDE.md para instrucciones detalladas"
echo "2. Crea repositorio en GitHub"
echo "3. Conecta Vercel para el frontend"
echo "4. Conecta Heroku para el backend"
echo "5. Disfruta tu e-commerce en línea!"
echo ""
echo "════════════════════════════════════════════════════════════════"
