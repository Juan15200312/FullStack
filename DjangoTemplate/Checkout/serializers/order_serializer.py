from rest_framework import serializers
from Books.models import BookModel, CuponModel
from Checkout.models import OrderModel


class OrderSerializer(serializers.ModelSerializer):
    shipping = serializers.JSONField(write_only=True)
    payment = serializers.JSONField(write_only=True)
    items = serializers.JSONField(write_only=True)


    class Meta:
        model = OrderModel
        fields = ('shipping', 'payment', 'items', 'total', 'cupon_code')


    def validate(self, data):
        discount = 0
        total_servidor = 0
        items_cart = data.get('items', [])
        total_angular = data.get('total', 0)
        cupon_code = data.get('cupon_code', '')
        delivery = data.get('shipping', {}).get('delivery', 0)
        iva = 0.04

        if not items_cart:
            raise serializers.ValidationError('No se enviaron los items.')

        try:
            for item in items_cart:
                book = BookModel.objects.get(id=item.get('book_id'))

                total_servidor += book.price * item.get('count')

        except BookModel.DoesNotExist:
            raise serializers.ValidationError('Uno de los libros enviados no existe.')



        if cupon_code:
            cupon = CuponModel.objects.get(code=cupon_code)
            discount = cupon.discount * total_servidor / 100

        total_servidor = total_servidor - discount + delivery + total_servidor*iva

        print(round(total_servidor, 2))
        print(total_angular)

        if total_angular != round(total_servidor, 2):
            raise serializers.ValidationError('Los precios no coinciden con la BBDD.')

        return {
            'success': True
        }

    def create(self, validated_data):
        pass