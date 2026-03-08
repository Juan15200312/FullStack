from rest_framework import serializers

from Checkout.models import OrderModel
from Checkout.serializers.order_detail_serializer import OrderDetailSerializer


class SearchOrderSerializer(serializers.Serializer):
    slug = serializers.CharField()
    email = serializers.EmailField(required=False, allow_blank=True, allow_null=True)

    def validate(self, data):
        email = data.get('email')
        slug = data.get('slug')
        request = self.context.get('request')

        if request.user.is_authenticated:
            order = OrderModel.objects.filter(slug=slug).first()
        else:
            order = OrderModel.objects.filter(slug=slug, shipping__email=email).first()

        if not order:
            raise serializers.ValidationError("El pedido no existe.")

        serializer = OrderDetailSerializer(instance=order)

        return serializer.data



