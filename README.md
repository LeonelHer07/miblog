
---

```markdown
# MyBlog

**MyBlog** es un proyecto personal desarrollado como práctica, orientado a crear un blog funcional donde se pueden publicar, listar y mostrar artículos.  
El objetivo principal del proyecto es **practicar y demostrar habilidades en desarrollo fullstack**, utilizando **React** en el frontend, **Django** en el backend y **MySQL** como base de datos.

El proyecto permite experimentar con la comunicación entre frontend y backend mediante APIs, gestión de datos en la base de datos y manejo de estados y rutas en React, brindando una experiencia de aprendizaje completa en desarrollo web fullstack.


---

## 📁 Estructura del proyecto

```

myblog/
├─ backend/              # Backend Django
│   ├─ manage.py
│   ├─ myblog/           # Proyecto Django (settings, urls, wsgi/asgi)
│   ├─ apps/             # Apps Django (articles, users, etc.)
│   └─ requirements.txt  # Dependencias Python
├─ frontend/             # Frontend React
│   ├─ package.json
│   └─ src/
│       ├─ assets/
│       ├─ components/
│       ├─ context/
│       ├─ hooks/
│       ├─ pages/
│       ├─ routes/
│       ├─ services/
│       └─ utils/
├─ venv/                 # Entorno virtual Python (opcional)
└─ README.md

````

---

## 🚀 Tecnologías

- **Frontend:** React, React Router, Context API  
- **Backend:** Django, Django REST Framework  
- **Base de datos:** MySQL  
- **Otros:** Axios (frontend), environment variables, git  

---

## ⚡ Requisitos

- Python 3.10+  
- Node.js 18+ y npm  
- MySQL 8+  
- Git  

---

## 🔧 Instalación y configuración

### 1. Clonar el proyecto
```bash
git clone https://github.com/tu-usuario/myblog.git
cd myblog
````

### 2. Configurar entorno virtual para Django

```bash
python -m venv venv
# Activar el entorno
# Linux/macOS
source venv/bin/activate
# Windows (cmd)
venv\Scripts\activate
# Windows (PowerShell)
venv\Scripts\Activate.ps1
```

### 3. Instalar dependencias del backend

```bash
pip install -r backend/requirements.txt
```

### 4. Configurar base de datos

* Edita `backend/myblog/settings.py` y actualiza la configuración de MySQL:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'nombre_db',
        'USER': 'usuario',
        'PASSWORD': 'contraseña',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```

* Crea la base de datos en MySQL:

```sql
CREATE DATABASE nombre_db;
```

### 5. Migraciones Django

```bash
cd backend
python manage.py makemigrations
python manage.py migrate
```

### 6. Correr servidor Django

```bash
python manage.py runserver
```

> El backend estará en `http://127.0.0.1:8000/`.

### 7. Configurar y correr frontend

```bash
cd frontend
npm install
npm start
```

> El frontend estará en `http://localhost:3000/`.

---

## ⚙️ Uso

* Accede al blog desde el navegador (`localhost:3000`)
* Las rutas consumen la API Django (`localhost:8000/api/`)
* Puedes agregar, editar y listar artículos mediante la interfaz.

---

## 📦 Despliegue

* **Frontend estático:** usar GitHub Pages, Vercel o Render (apuntar a `frontend/build/`)
* **Backend Django:** usar Render, Railway o Heroku
* **Base de datos:** Render Postgres recomendado, o MySQL en un servidor remoto

---

## 📝 Buenas prácticas

* Mantener `venv/` y `node_modules/` en `.gitignore`
* Actualizar `requirements.txt` después de instalar nuevas dependencias:

```bash
pip freeze > backend/requirements.txt
```

* Separar rutas, hooks, context y servicios en frontend para escalabilidad

---

## 📚 Recursos

* [Documentación Django](https://docs.djangoproject.com/)
* [Django REST Framework](https://www.django-rest-framework.org/)
* [React](https://reactjs.org/)

---

## 👤 Autor

Leo [LeonelHer07](https://github.com/LeonelHer07)

---

```

---
