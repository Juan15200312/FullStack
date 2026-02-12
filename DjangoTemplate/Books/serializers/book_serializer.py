from rest_framework import serializers
from Books.models import BookModel, CategoryModel, AuthorModel


class BookSerializer(serializers.ModelSerializer):
    categories = serializers.StringRelatedField(many=True)
    authors = serializers.StringRelatedField(many=True)

    class Meta:
        model = BookModel
        fields = ('id', 'title', 'description', 'isbn', 'year', 'stock', 'price',
                  'image', 'slug', 'categories', 'authors')


