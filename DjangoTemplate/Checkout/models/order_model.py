from django.db import models

class OrderModel(models.Model):
    class MethodDelivery(models.TextChoices):
        STANDARD = 'ST', 'Estándar'
        EXPRESS = 'EX', 'Rápida'

    class MethodPayment(models.TextChoices):
        DEBIT_CARD = 'DC', 'Tarjeta de Débito'
        PAYPAL = 'PP', 'PayPal'
        STRIPE = 'ST', 'Transferencia'

    names_shipping = models.CharField(max_length=150, blank=False, null=False)
    email = models.EmailField(blank=False, null=False)
    phone = models.CharField(max_length=11, blank=False, null=False)
    street_address = models.TextField(max_length=255, blank=False, null=False)
    city = models.CharField(max_length=100, blank=False, null=False)
    zip_code = models.CharField(max_length=10, blank=False, null=False)
    delivery = models.CharField(
        max_length=2,
        choices=MethodDelivery.choices,
        default=MethodDelivery.EXPRESS
    )

    names_payment = models.CharField(max_length=150, blank=False, null=False)
    card_number = models.CharField(max_length=19, blank=False, null=False)
    exp = models.CharField(max_length=5, blank=False, null=False)
    cvv = models.CharField(max_length=3, blank=False, null=False)
    method = models.CharField(
        max_length=2,
        choices=MethodPayment.choices,
        default=MethodPayment.DEBIT_CARD,
    )


    total = models.FloatField(null=False, blank=False)
    cupon_code = models.CharField(max_length=100, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'orders'
        verbose_name = 'Order'
        verbose_name_plural = '1. Orders'


