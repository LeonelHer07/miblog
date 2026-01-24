from django.shortcuts import render

# Create your views here.
# core/views.py
from rest_framework import generics
from .models import Article
from .serializers import ArticleSerializer

class ArticleListAPI(generics.ListAPIView):
    queryset = Article.objects.all().order_by('-created_at')
    serializer_class = ArticleSerializer

