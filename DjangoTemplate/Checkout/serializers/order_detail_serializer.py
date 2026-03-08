from rest_framework import serializers

from Checkout.models import OrderModel
from Checkout.serializers.order_item_serializer import OrderItemSerializer
from Checkout.serializers.shipping_serializer import ShippingSerializer


class OrderDetailSerializer(serializers.ModelSerializer):
    shipping = ShippingSerializer()
    items = OrderItemSerializer(many=True)

    class Meta:
        model = OrderModel
        fields = '__all__'