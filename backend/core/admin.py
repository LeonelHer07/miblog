from django.contrib import admin

from .models import Article, Tag, ArticleImage


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ("title", "author", "created_at")
    list_filter = ("created_at", "tags")
    search_fields = ("title", "body", "author__username", "tags__name")
    filter_horizontal = ("tags",)


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)


@admin.register(ArticleImage)
class ArticleImageAdmin(admin.ModelAdmin):
    list_display = ("article", "caption", "uploaded_at")
    search_fields = ("article__title", "caption")
