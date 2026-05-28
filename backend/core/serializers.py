from rest_framework import serializers
from .models import Article, Tag


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["id", "name"]


class ArticleSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)
    author = serializers.StringRelatedField(read_only=True)
    cover_image = serializers.ImageField(read_only=True)

    class Meta:
        model = Article
        fields = ["id", "title", "body", "author", "created_at", "tags", "cover_image"]


class ArticleWriteSerializer(serializers.ModelSerializer):
    tag_names = serializers.CharField(required=False, allow_blank=True, write_only=True)

    class Meta:
        model = Article
        fields = ["id", "title", "body", "cover_image", "tag_names"]

    def create(self, validated_data):
        tag_names = validated_data.pop("tag_names", "")
        article = Article.objects.create(**validated_data)

        tags = [
            Tag.objects.get_or_create(name=name.strip())[0]
            for name in tag_names.split(",")
            if name.strip()
        ]

        if tags:
            article.tags.set(tags)

        return article

    def update(self, instance, validated_data):
        tag_names = validated_data.pop("tag_names", None)

        for field, value in validated_data.items():
            setattr(instance, field, value)

        instance.save()

        if tag_names is not None:
            tags = [
                Tag.objects.get_or_create(name=name.strip())[0]
                for name in tag_names.split(",")
                if name.strip()
            ]
            instance.tags.set(tags)

        return instance
