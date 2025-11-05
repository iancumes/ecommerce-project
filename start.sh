#!/bin/bash

# 🚀 Script de Inicio Rápido - E-Commerce Project
# Este script te ayuda a iniciar el proyecto rápidamente

echo "🛒 E-Commerce Project - Inicio Rápido"
echo "====================================="
echo ""

# Función para mostrar el menú
show_menu() {
    echo "Selecciona una opción:"
    echo ""
    echo "1) 🐍 Iniciar Backend (Django) en puerto 8000"
    echo "2) 🎨 Iniciar Frontend (Vue.js) en puerto 5173"
    echo "3) 🚀 Iniciar ambos servidores"
    echo "4) 📦 Instalar/Actualizar dependencias"
    echo "5) 🗃️  Aplicar migraciones de Django"
    echo "6) 👤 Crear superusuario de Django"
    echo "7) 🧹 Limpiar base de datos y reiniciar"
    echo "8) ❌ Salir"
    echo ""
}

# Función para iniciar backend
start_backend() {
    echo "🐍 Iniciando Backend Django..."
    cd backend
    source venv/bin/activate
    python manage.py runserver
}

# Función para iniciar frontend
start_frontend() {
    echo "🎨 Iniciando Frontend Vue.js..."
    cd frontend/ecommerce-frontend
    npm run dev
}

# Función para iniciar ambos
start_both() {
    echo "🚀 Iniciando ambos servidores..."
    echo ""
    echo "⚠️  Necesitarás abrir 2 terminales:"
    echo ""
    echo "Terminal 1 - Backend:"
    echo "cd /var/www/html/ecommerce-project/backend"
    echo "source venv/bin/activate"
    echo "python manage.py runserver"
    echo ""
    echo "Terminal 2 - Frontend:"
    echo "cd /var/www/html/ecommerce-project/frontend/ecommerce-frontend"
    echo "npm run dev"
    echo ""
}

# Función para instalar dependencias
install_deps() {
    echo "📦 Instalando dependencias..."
    
    # Backend
    echo "📦 Backend - Python..."
    cd backend
    source venv/bin/activate
    pip install -r requirements.txt
    cd ..
    
    # Frontend
    echo "📦 Frontend - npm..."
    cd frontend/ecommerce-frontend
    npm install
    cd ../..
    
    echo "✅ Dependencias instaladas"
}

# Función para aplicar migraciones
apply_migrations() {
    echo "🗃️  Aplicando migraciones..."
    cd backend
    source venv/bin/activate
    python manage.py makemigrations
    python manage.py migrate
    cd ..
    echo "✅ Migraciones aplicadas"
}

# Función para crear superusuario
create_superuser() {
    echo "👤 Crear superusuario..."
    cd backend
    source venv/bin/activate
    python manage.py createsuperuser
    cd ..
}

# Función para limpiar base de datos
clean_database() {
    echo "🧹 Limpiando base de datos..."
    read -p "⚠️  ¿Estás seguro? Esto eliminará todos los datos (s/n): " confirm
    if [ "$confirm" = "s" ]; then
        cd backend
        rm -f db.sqlite3
        find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
        find . -path "*/migrations/*.pyc" -delete
        source venv/bin/activate
        python manage.py makemigrations
        python manage.py migrate
        echo "✅ Base de datos limpia"
        echo "👤 Ahora crea un nuevo superusuario:"
        python manage.py createsuperuser
        cd ..
    else
        echo "❌ Cancelado"
    fi
}

# Bucle principal
while true; do
    show_menu
    read -p "Opción: " option
    
    case $option in
        1) start_backend ;;
        2) start_frontend ;;
        3) start_both ;;
        4) install_deps ;;
        5) apply_migrations ;;
        6) create_superuser ;;
        7) clean_database ;;
        8) echo "👋 Adiós!"; exit 0 ;;
        *) echo "❌ Opción inválida" ;;
    esac
    
    echo ""
    read -p "Presiona Enter para continuar..."
    clear
done
