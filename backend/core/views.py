import os

from django.contrib.auth import get_user_model
from rest_framework import generics
from .models import Article
from .serializers import ArticleSerializer, ArticleWriteSerializer


class ArticleQuerySetMixin:
    queryset = (
        Article.objects.select_related("author")
        .prefetch_related("tags")
        .order_by("-created_at")
    )
    serializer_class = ArticleSerializer


class ArticleListAPI(generics.ListCreateAPIView):
    queryset = ArticleQuerySetMixin.queryset
    serializer_class = ArticleQuerySetMixin.serializer_class

    def get_serializer_class(self):
        if self.request.method == "POST":
            return ArticleWriteSerializer
        return ArticleSerializer

    def perform_create(self, serializer):
        username = os.environ.get("DEFAULT_ARTICLE_AUTHOR_USERNAME", "frontend-author")
        user, _ = get_user_model().objects.get_or_create(
            username=username,
            defaults={"is_staff": True},
        )
        serializer.save(author=user)


class ArticleDetailAPI(generics.RetrieveUpdateAPIView):
    queryset = ArticleQuerySetMixin.queryset
    serializer_class = ArticleQuerySetMixin.serializer_class

    def get_serializer_class(self):
        if self.request.method in {"PUT", "PATCH"}:
            return ArticleWriteSerializer
        return ArticleSerializer
