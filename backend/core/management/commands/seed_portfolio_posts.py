from pathlib import Path
from urllib.error import URLError
from urllib.request import Request, urlopen

from django.contrib.auth import get_user_model
from django.core.files.base import ContentFile
from django.core.management.base import BaseCommand

from core.models import Article, Tag


POSTS = [
    {
        "title": "Como disenar una interfaz que se pueda escanear rapido",
        "tags": ["UX", "Frontend", "Portafolio"],
        "image_id": 10,
        "body": """
<h2>El usuario no lee primero: escanea</h2>
<p>Una interfaz profesional no depende de decorar mas, sino de ordenar mejor. Titulos claros, jerarquia visual, espacios consistentes y acciones visibles ayudan a que el usuario entienda donde esta y que puede hacer.</p>
<blockquote>El buen diseno reduce decisiones innecesarias.</blockquote>
<h3>Principios practicos</h3>
<ul><li>Usa encabezados concretos.</li><li>Agrupa controles relacionados.</li><li>Haz que la accion principal sea facil de encontrar.</li></ul>
""",
    },
    {
        "title": "React como capa de experiencia, no solo componentes",
        "tags": ["React", "Frontend"],
        "image_id": 100,
        "body": """
<h2>Componentes con intencion</h2>
<p>React funciona mejor cuando los componentes representan decisiones de producto: una tarjeta de articulo, un editor, un panel de ajustes o una navegacion contextual.</p>
<p>Separar componentes por dominio ayuda a que el proyecto se sienta mas claro y mantenible.</p>
""",
    },
    {
        "title": "Django REST Framework para un blog mantenible",
        "tags": ["Django", "API", "Backend"],
        "image_id": 1015,
        "body": """
<h2>Una API simple puede ser muy poderosa</h2>
<p>Un blog no necesita una arquitectura enorme para verse profesional. Lista paginada, detalle, creacion y edicion cubren el ciclo principal del contenido.</p>
<pre><code>GET /api/articles/
POST /api/articles/
PATCH /api/articles/&lt;id&gt;/</code></pre>
""",
    },
    {
        "title": "Por que la paginacion mejora la lectura",
        "tags": ["UX", "Performance"],
        "image_id": 1016,
        "body": """
<h2>Menos carga visual, mas control</h2>
<p>Mostrar todos los posts de una vez puede parecer simple, pero rapidamente se vuelve pesado. La paginacion permite navegar con calma y mantiene estable la seccion de contenido.</p>
<ul><li>Reduce scroll innecesario.</li><li>Hace visible el volumen del contenido.</li><li>Mejora la percepcion de orden.</li></ul>
""",
    },
    {
        "title": "El valor de un editor visual en un blog personal",
        "tags": ["Editor", "UX", "React"],
        "image_id": 1018,
        "body": """
<h2>Escribir tambien es una experiencia de usuario</h2>
<p>Un editor tipo bloque permite concentrarse en la idea sin recordar sintaxis. Comandos con slash, bloques visuales y una vista previa confiable convierten el formulario en una herramienta.</p>
<mark>La escritura mejora cuando el sistema desaparece.</mark>
""",
    },
    {
        "title": "Como estructurar un proyecto fullstack pequeno",
        "tags": ["Arquitectura", "Fullstack"],
        "image_id": 1020,
        "body": """
<h2>Orden antes que complejidad</h2>
<p>En proyectos de portafolio conviene separar responsabilidades sin inventar demasiadas capas. Backend, frontend, servicios, componentes por dominio y contexto compartido suelen ser suficientes.</p>
<h3>Una estructura sana</h3>
<ul><li>Servicios para API.</li><li>Componentes por dominio.</li><li>Layouts separados.</li><li>Configuracion por entorno.</li></ul>
""",
    },
    {
        "title": "Dark mode: mas que invertir colores",
        "tags": ["UI", "Accesibilidad"],
        "image_id": 1024,
        "body": """
<h2>Contraste y calma visual</h2>
<p>Un modo oscuro profesional cuida contraste, jerarquia y estados. No basta con cambiar blanco por negro: los bordes, textos secundarios y fondos necesitan una escala propia.</p>
<blockquote>El modo oscuro debe sentirse disenado, no improvisado.</blockquote>
""",
    },
    {
        "title": "Tarjetas de blog que invitan a leer",
        "tags": ["UI", "Contenido"],
        "image_id": 1025,
        "body": """
<h2>La tarjeta es una promesa</h2>
<p>Una buena tarjeta muestra titulo, imagen, extracto y etiquetas sin saturar. Debe prometer valor y permitir decidir rapido si vale la pena abrir el articulo.</p>
<ul><li>Imagen clara.</li><li>Titulo fuerte.</li><li>Extracto breve.</li><li>Tags utiles.</li></ul>
""",
    },
    {
        "title": "Validaciones que hacen sentir confiable una app",
        "tags": ["Calidad", "Testing"],
        "image_id": 1031,
        "body": """
<h2>La confianza se construye en pequenos checks</h2>
<p>Lint, build y tests backend no son burocracia. Son una forma de saber que cada mejora deja el proyecto mas estable que antes.</p>
<pre><code>npm run lint
npm run build
python manage.py test</code></pre>
""",
    },
    {
        "title": "El detalle de articulo como pantalla de lectura",
        "tags": ["UX", "Blog"],
        "image_id": 1035,
        "body": """
<h2>Leer debe sentirse ligero</h2>
<p>La pagina de detalle debe priorizar contenido: buen ancho de lectura, tipografia clara, metadatos discretos y acciones secundarias como editar sin interrumpir.</p>
<p><small>Una interfaz editorial vive o muere por la comodidad de lectura.</small></p>
""",
    },
    {
        "title": "Por que centralizar la comunicacion con la API",
        "tags": ["JavaScript", "API"],
        "image_id": 1040,
        "body": """
<h2>Un servicio evita repeticion</h2>
<p>Cuando todas las llamadas pasan por un archivo de servicios, cambiar URLs, manejar errores o agregar paginacion se vuelve mucho mas facil.</p>
<blockquote>Menos fetch duplicado, mas intencion.</blockquote>
""",
    },
    {
        "title": "De formulario a herramienta editorial",
        "tags": ["Producto", "Editor"],
        "image_id": 1041,
        "body": """
<h2>La diferencia esta en el flujo</h2>
<p>Un formulario pide datos. Una herramienta ayuda a pensar. El editor del blog gana valor cuando permite crear, editar, formatear y previsualizar sin salir del contexto.</p>
<h3>Resultado esperado</h3>
<p><span style="font-size: 1.35rem; font-weight: 700;">Publicar debe sentirse natural.</span></p>
""",
    },
    {
        "title": "Etiquetas que organizan sin estorbar",
        "tags": ["Contenido", "UX"],
        "image_id": 1043,
        "body": """
<h2>Tags como pistas de lectura</h2>
<p>Las etiquetas ayudan cuando son pocas, claras y consistentes. Sirven para orientar al lector y para revelar los temas fuertes del portafolio.</p>
<ul><li>Frontend</li><li>Django</li><li>UX</li><li>Testing</li></ul>
""",
    },
    {
        "title": "Imagenes de portada con funcion editorial",
        "tags": ["Visual", "Blog"],
        "image_id": 1050,
        "body": """
<h2>La imagen tambien comunica estructura</h2>
<p>Una portada ayuda a separar articulos, dar ritmo visual y crear una primera impresion. Lo importante es que no compita con el titulo.</p>
<p><mark>Imagen fuerte, contenido claro.</mark></p>
""",
    },
    {
        "title": "Como presentar un proyecto de portafolio",
        "tags": ["Portafolio", "Carrera"],
        "image_id": 1060,
        "body": """
<h2>Mostrar criterio, no solo codigo</h2>
<p>Un proyecto de portafolio debe demostrar que puedes tomar decisiones: arquitectura, UX, validaciones, documentacion y pequenos detalles de producto.</p>
<blockquote>El mejor portafolio cuenta como piensas.</blockquote>
""",
    },
]


class Command(BaseCommand):
    help = "Create 15 portfolio demo posts with downloaded cover images."

    def handle(self, *args, **options):
        user, _ = get_user_model().objects.get_or_create(
            username="frontend-author",
            defaults={"is_staff": True},
        )
        created = 0

        for post in POSTS:
            article, was_created = Article.objects.get_or_create(
                title=post["title"],
                defaults={"author": user, "body": post["body"].strip()},
            )

            if not was_created:
                continue

            tags = [
                Tag.objects.get_or_create(name=tag_name)[0]
                for tag_name in post["tags"]
            ]
            article.tags.set(tags)

            image_url = f"https://picsum.photos/id/{post['image_id']}/1200/700"
            request = Request(image_url, headers={"User-Agent": "MyBlog seed command"})

            try:
                with urlopen(request, timeout=20) as response:
                    image_bytes = response.read()
                filename = f"{Path(post['title']).stem[:48].replace(' ', '-').lower()}.jpg"
                article.cover_image.save(filename, ContentFile(image_bytes), save=True)
            except URLError as error:
                self.stderr.write(f"Could not download image for {post['title']}: {error}")

            created += 1

        self.stdout.write(self.style.SUCCESS(f"Created {created} new posts."))
