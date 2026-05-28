# MyBlog

MyBlog es un blog personal full-stack creado como proyecto de portafolio. Usa React con Vite en el frontend y Django REST Framework en el backend para listar y mostrar articulos publicados desde el panel de administracion de Django.

## Estructura

```text
myblog/
├─ backend/
│  ├─ backend/          # Settings, urls, wsgi/asgi
│  ├─ core/             # Modelos, serializers, vistas y tests
│  ├─ manage.py
│  ├─ requirements.txt
│  └─ .env.example
├─ frontend/
│  ├─ src/
│  │  ├─ components/
│  │  ├─ context/
│  │  ├─ pages/
│  │  └─ services/
│  ├─ package.json
│  └─ .env.example
└─ README.md
```

## Tecnologias

- Frontend: React, Vite, React Router, Tailwind CSS, React Markdown.
- Backend: Django, Django REST Framework.
- Base de datos: SQLite por defecto para desarrollo; MySQL disponible por variables de entorno.

## Organizacion del Codigo

- `backend/backend/`: configuracion del proyecto Django. Es el nombre generado por Django; se puede renombrar a `config`, pero no es necesario para este tamano.
- `backend/core/`: dominio principal del blog: modelos, serializers, vistas, urls, admin y tests.
- `frontend/src/components/articles/`: componentes especificos del dominio de articulos.
- `frontend/src/components/layout/`: componentes de estructura general como navegacion, logo, scroll y toggle de tema.
- `frontend/src/context/`: providers, hooks y objetos context separados para mantener Fast Refresh limpio.
- `frontend/src/services/`: comunicacion con APIs externas o backend propio.

## Configuracion del Backend

```bash
cd backend
python -m venv ../venv
../venv/Scripts/activate
pip install -r requirements.txt
copy .env.example .env
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

El backend queda disponible en `http://127.0.0.1:8000/`.

Variables principales del backend:

- `DJANGO_SECRET_KEY`: llave secreta de Django.
- `DJANGO_DEBUG`: `True` en local, `False` en produccion.
- `DJANGO_ALLOWED_HOSTS`: hosts permitidos separados por coma.
- `CORS_ALLOWED_ORIGINS`: origenes del frontend permitidos.
- `DB_ENGINE`: `sqlite` o `mysql`.
- `DRF_PAGE_SIZE`: cantidad de articulos por pagina.

## Configuracion del Frontend

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

El frontend de Vite queda disponible normalmente en `http://localhost:5173/`.

Variable principal del frontend:

- `VITE_API_BASE_URL`: URL base del backend, por ejemplo `http://localhost:8000`.

## API

- `GET /api/articles/`: lista paginada de articulos.
- `POST /api/articles/`: crea un articulo desde el frontend.
- `GET /api/articles/<id>/`: detalle de un articulo.
- `PATCH /api/articles/<id>/`: actualiza un articulo desde el frontend.

Los articulos se pueden crear desde `/articles/new`, editar desde `/articles/<id>/edit` o administrar desde `/admin/`. Mientras no exista autenticacion en el frontend, los articulos creados desde la UI usan el autor configurado en `DEFAULT_ARTICLE_AUTHOR_USERNAME`.

El editor del frontend incluye comandos con `/` para insertar formatos como encabezados, negrita, listas, citas, bloques de codigo, enlaces, divisores, color y tamano de texto.

## Validacion

Backend:

```bash
cd backend
python manage.py check
python manage.py test
```

Datos demo:

```bash
cd backend
python manage.py seed_portfolio_posts
```

Este comando agrega 15 articulos de demostracion con imagenes descargadas desde Lorem Picsum.

Frontend:

```bash
cd frontend
npm run lint
npm run build
```

## Notas de Repositorio

El repositorio ignora entornos virtuales, caches de Python, archivos `.env`, media local de Django y artefactos de build. Las imagenes subidas en desarrollo no se versionan; para despliegue publico conviene usar almacenamiento externo o configurar media persistente en la plataforma elegida.

## Autor

Leo [LeonelHer07](https://github.com/LeonelHer07)
