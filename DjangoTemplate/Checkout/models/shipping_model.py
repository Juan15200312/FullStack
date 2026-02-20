from django.db import models


class ShippingModel(models.Model):
    class MethodDelivery(models.TextChoices):
        STANDARD = 'ST', 'Estándar'
        EXPRESS = 'EX', 'Rápida'


    names = models.CharField(max_length=150, blank=False, null=False)
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

    class Meta:
        db_table = 'shipping'
        verbose_name = 'Shipping'
        verbose_name_plural = '2. Shipping'