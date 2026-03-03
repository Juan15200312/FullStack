from django.db import models

class OrderModel(models.Model):
    class Status(models.TextChoices):
        PENDING = 'PENDING', 'Pendiente'
        PAID = 'PAID', 'Pagado'
        FAILED = 'FAILED', 'Fallido'
        CANCELLED = 'CANCELLED', 'Cancelado'

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
    delivery = models.CharField(max_length=2, choices=[('ST','Estándar'), ('EX','Rápida')], default='ST')

    payment_processor = models.CharField(max_length=50, null=True, blank=True)
    payment_intent_id = models.CharField(max_length=255, null=True, blank=True)
    payment_transaction_id = models.CharField(max_length=255, null=True, blank=True)
    payment_status = models.CharField(max_length=50, default='PENDING')
    payment_method_last4 = models.CharField(max_length=4, null=True, blank=True)
    payment_method_brand = models.CharField(max_length=50, null=True, blank=True)


    total = models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False)
    cupon_code = models.CharField(max_length=100, null=True, blank=True)

    metadata = models.JSONField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'orders'
        verbose_name = 'Order'
        verbose_name_plural = '1. Orders'


