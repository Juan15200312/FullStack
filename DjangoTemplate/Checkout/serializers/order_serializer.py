from django.db import transaction
from rest_framework import serializers
from Books.models import BookModel, CuponModel
from Checkout.models import OrderModel, OrderItemModel, ShippingModel
from Checkout.serializers.order_item_serializer import OrderItemSerializer
from Checkout.serializers.shipping_serializer import ShippingSerializer


class OrderSerializer(serializers.Serializer):
    from Checkout.serializers.shipping_serializer import ShippingSerializer
    shipping = ShippingSerializer(many=False)
    payment = serializers.JSONField(required=False)
    items = OrderItemSerializer(many=True)
    total = serializers.DecimalField(max_digits=10, decimal_places=2)
    cupon_code = serializers.CharField(required=False, allow_blank=True)
    expected_delivery_from = serializers.DateField()
    expected_delivery_to = serializers.DateField()

    def validate(self, data):
        discount = 0
        total_servidor = 0
        items_cart = data.get('items', [])
        total_angular = data.get('total', 0)
        cupon_code = data.get('cupon_code', '')
        delivery = data.get('shipping', {}).get('delivery')
        price_delivery = 5 if delivery == 'ST' else 10
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

        total_servidor = total_servidor - discount + price_delivery + total_servidor*iva

        print(round(total_servidor, 2))
        print(total_angular)
        print(type(total_servidor))
        print(type(total_angular))

        if float(total_angular) != float(round(total_servidor, 2)):
            raise serializers.ValidationError('Los precios no coinciden con la BBDD.')

        return data

    def create(self, validated_data):
        with transaction.atomic():
            shipping_data = validated_data.pop('shipping')
            items = validated_data.pop('items')
            request = self.context.get('request')

            print(request.user)
            print(request.user.is_authenticated)

            shipping_serializer = ShippingSerializer(data=shipping_data, context={'request': request})
            if not shipping_serializer.is_valid():
                raise serializers.ValidationError(shipping_serializer.errors)

            shipping = shipping_serializer.save()

            order = OrderModel.objects.create(
                user= request.user if request.user.is_authenticated else None,
                total=validated_data['total'],
                shipping=shipping,
                cupon_code=validated_data.get('cupon_code'),
                expected_delivery_from=validated_data.get('expected_delivery_from'),
                expected_delivery_to=validated_data.get('expected_delivery_to'),
            )
            order_items = []
            for item in items:
                book = BookModel.objects.get(id=item.get('book_id'))

                order_items.append(OrderItemModel(
                    order= order,
                    book=book,
                    count=item.get('count'),
                    unit_price=book.price,
                    title_x=book.title
                ))
            OrderItemModel.objects.bulk_create(order_items)
            return order