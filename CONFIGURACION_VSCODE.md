# Configuración de VS Code para Python

Este archivo contiene la configuración recomendada del intérprete de Python en VS Code.

## Cómo Configurar el Intérprete de Python

### Opción 1: Manual (Recomendado)

1. Presiona `Ctrl + Shift + P` (o `Cmd + Shift + P` en Mac)
2. Escribe: `Python: Select Interpreter`
3. Selecciona el intérprete del entorno virtual:
   ```
   /var/www/html/ecommerce-project/backend/venv/bin/python
   ```

### Opción 2: Automática

VS Code debería crear automáticamente un archivo `.vscode/settings.json` en la raíz del proyecto.

Si no existe, créalo manualmente:

```json
{
    "python.defaultInterpreterPath": "${workspaceFolder}/backend/venv/bin/python",
    "python.terminal.activateEnvironment": true,
    "python.linting.enabled": true,
    "python.linting.pylintEnabled": false,
    "python.linting.flake8Enabled": true,
    "python.formatting.provider": "black",
    "[python]": {
        "editor.defaultFormatter": "ms-python.black-formatter",
        "editor.formatOnSave": true,
        "editor.codeActionsOnSave": {
            "source.organizeImports": "explicit"
        }
    },
    "files.exclude": {
        "**/__pycache__": true,
        "**/*.pyc": true
    }
}
```

## Extensiones Recomendadas de VS Code

### Python
- **Python** (ms-python.python)
- **Pylance** (ms-python.vscode-pylance)
- **Black Formatter** (ms-python.black-formatter)

### Vue.js
- **Volar** (Vue.volar)
- **Vue VSCode Snippets** (sdras.vue-vscode-snippets)

### Utilidades
- **ESLint** (dbaeumer.vscode-eslint)
- **Prettier** (esbenp.prettier-vscode)
- **Path Intellisense** (christian-kohler.path-intellisense)
- **Auto Rename Tag** (formulahendry.auto-rename-tag)
- **GitLens** (eamodio.gitlens)

## Verificar que Funciona

Después de configurar el intérprete:

1. Abre cualquier archivo `.py` del proyecto
2. Los errores de importación de Django deberían desaparecer
3. El autocompletado debería funcionar
4. En la barra inferior de VS Code deberías ver: `Python 3.12.3 ('venv')`

## Solución de Problemas

### Los errores de importación persisten

1. Recarga VS Code: `Ctrl + Shift + P` → `Developer: Reload Window`
2. Verifica que el entorno virtual esté activado
3. Reinstala las extensiones de Python

### El terminal no activa el entorno virtual automáticamente

Agrega esto a settings.json:
```json
{
    "python.terminal.activateEnvironment": true
}
```

### Pylance no encuentra los módulos

Asegúrate de que estás trabajando en el workspace correcto y que la configuración apunta al venv correcto.
