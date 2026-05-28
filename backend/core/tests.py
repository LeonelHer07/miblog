import json

from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from .models import Article, Tag


class ArticleAPITests(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(
            username="leo",
            password="test-pass",
        )
        self.tag = Tag.objects.create(name="React")
        self.article = Article.objects.create(
            title="Primer articulo",
            body="Contenido en markdown",
            author=self.user,
        )
        self.article.tags.add(self.tag)

    def test_article_list_returns_paginated_articles(self):
        response = self.client.get(reverse("article-list-api"))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["count"], 1)
        self.assertEqual(response.data["results"][0]["title"], self.article.title)
        self.assertEqual(response.data["results"][0]["author"], self.user.username)

    def test_article_detail_returns_article(self):
        response = self.client.get(
            reverse("article-detail-api", kwargs={"pk": self.article.pk})
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["title"], self.article.title)
        self.assertEqual(response.data["tags"][0]["name"], self.tag.name)

    def test_article_detail_returns_404_for_missing_article(self):
        response = self.client.get(reverse("article-detail-api", kwargs={"pk": 999}))

        self.assertEqual(response.status_code, 404)

    def test_article_list_creates_article_with_default_author_and_tags(self):
        response = self.client.post(
            reverse("article-list-api"),
            {
                "title": "Nuevo articulo",
                "body": "Contenido creado desde frontend",
                "tag_names": "Django, React",
            },
        )

        self.assertEqual(response.status_code, 201)
        article = Article.objects.get(title="Nuevo articulo")
        self.assertEqual(article.author.username, "frontend-author")
        self.assertEqual(article.tags.count(), 2)

    def test_article_detail_updates_article_and_tags(self):
        response = self.client.patch(
            reverse("article-detail-api", kwargs={"pk": self.article.pk}),
            data=json.dumps({
                "title": "Articulo actualizado",
                "body": "<h2>Contenido actualizado</h2>",
                "tag_names": "UX, React",
            }),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 200)
        self.article.refresh_from_db()
        self.assertEqual(self.article.title, "Articulo actualizado")
        self.assertEqual(self.article.tags.count(), 2)
