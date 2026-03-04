from rest_framework import serializers
from Checkout.models import OrderItemModel


class OrderItemSerializer(serializers.ModelSerializer):
    book_id = serializers.IntegerField()

    class Meta:
        model = OrderItemModel
        fields = ('book_id', 'count', 'unit_price', 'title_x')
        read_only_fields = ('unit_price', 'title_x')