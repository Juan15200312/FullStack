from rest_framework import serializers

from Books.models import CategoryModel


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = CategoryModel
        fields = ('id', 'name', 'slug', 'icon', 'color', 'imagen', 'description')
