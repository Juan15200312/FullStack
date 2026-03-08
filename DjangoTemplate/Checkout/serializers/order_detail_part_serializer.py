from rest_framework import serializers

from Checkout.models import OrderModel


class OrderDetailPartSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderModel
        fields = ('slug', 'created_at', 'total', 'status')