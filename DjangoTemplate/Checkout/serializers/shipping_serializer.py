from django.db import transaction
from rest_framework import serializers

from Checkout.models import ShippingModel


class ShippingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingModel
        fields = ('names_shipping', 'email', 'phone',
                  'street_address', 'city', 'zip_code', 'delivery')

    def create(self, validated_data):
        with transaction.atomic():
            request = self.context.get('request', None)
            shipping = ShippingModel.objects.create(**validated_data)
            if request.user.is_authenticated:
                shipping.user = request.user
            shipping.save()
            return shipping

