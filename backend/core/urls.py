from django.urls import path
from .views import ArticleDetailAPI, ArticleListAPI

urlpatterns = [
    path("api/articles/", ArticleListAPI.as_view(), name="article-list-api"),
    path("api/articles/<int:pk>/", ArticleDetailAPI.as_view(), name="article-detail-api"),
]
