from rest_framework import serializers
from Books.models import BookModel, CategoryModel, AuthorModel


class BookSerializer(serializers.ModelSerializer):
    categories = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=CategoryModel.objects.all()
    )
    authors = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=AuthorModel.objects.all()
    )

    class Meta:
        model = BookModel
        fields = ('title', 'description', 'isbn', 'year', 'stock', 'price',
                  'image', 'slug', 'categories', 'authors')
