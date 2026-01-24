# core/serializers.py
from rest_framework import serializers
from .models import Article, Tag

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']

class ArticleSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True)  # incluir tags como lista
    cover_image = serializers.ImageField(read_only=True)  # esto generará la URL completa automáticamente

    class Meta:
        model = Article
        fields = ['id', 'title', 'body', 'author', 'created_at', 'tags', 'cover_image']

