from rest_framework import serializers
from Checkout.models import OrderItemModel


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItemModel
        fields = ('book_id_id', 'count')