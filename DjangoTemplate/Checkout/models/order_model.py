import uuid

from django.db import models

class OrderModel(models.Model):
    class Status(models.TextChoices):
        PENDING = 'PENDING', 'Pendiente'
        DELIVERED = 'DELIVERED', 'Entregado'
        SHIPPED = 'SHIPPED', 'Enviado'
        CANCELED = 'CANCELED', 'Cancelado'

    user = models.ForeignKey('Users.CustomUser', null=True, blank=True, on_delete=models.SET_NULL, related_name='orders', verbose_name="Usuario")
    slug = models.SlugField(max_length=100, unique=True, blank=True, null=True)

    shipping = models.ForeignKey('ShippingModel', on_delete=models.SET_NULL, null=True, blank=True, related_name='orders_shipping')

    # DATOS PARA PROCESAR EL PAGO
    # payment_processor = models.CharField(max_length=50, null=True, blank=True)
    # payment_intent_id = models.CharField(max_length=255, null=True, blank=True)
    # payment_transaction_id = models.CharField(max_length=255, null=True, blank=True)
    # payment_status = models.CharField(max_length=50, default='PENDING')
    # payment_method_last4 = models.CharField(max_length=4, null=True, blank=True)
    # payment_method_brand = models.CharField(max_length=50, null=True, blank=True)


    total = models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False)
    cupon_code = models.CharField(max_length=100, null=True, blank=True)


    metadata = models.JSONField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=Status, default=Status.PENDING, verbose_name="Estado")
    created_at = models.DateTimeField(auto_now_add=True)

    expected_delivery_from = models.DateField(default= None)
    expected_delivery_to = models.DateField(default= None)
    delivery_completed = models.DateTimeField(null=True, blank=True, default=None)


    class Meta:
        db_table = 'orders'
        verbose_name = 'Order'
        verbose_name_plural = '1. Pedidos'


    def __str__(self):
        return self.shipping.names_shipping if self.shipping else ''

    def save(self, *args, **kwargs):
        if not self.slug:
            slug_prov = uuid.uuid4().hex
            while OrderModel.objects.filter(slug=slug_prov).exists():
                slug_prov = uuid.uuid4().hex

            self.slug = slug_prov


        return super().save(*args, **kwargs)
