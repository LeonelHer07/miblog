from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Article(models.Model):
    title = models.CharField(max_length=255)
    body = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    # --- Nuevos campos ---
    tags = models.ManyToManyField(Tag, blank=True)  # campo de etiquetas
    cover_image = models.ImageField(upload_to='articles/covers/', null=True, blank=True)  # imagen opcional

    def __str__(self):
        return self.title
