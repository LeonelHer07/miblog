# core/urls.py
from django.urls import path
from .views import ArticleListAPI

urlpatterns = [
    path('api/articles/', ArticleListAPI.as_view(), name='article-list-api'),
]
