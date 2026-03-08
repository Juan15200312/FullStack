from django.db import models


class ShippingModel(models.Model):
    user = models.ForeignKey('Users.CustomUser', on_delete=models.SET_NULL, null=True, blank=True, default=None)
    names_shipping = models.CharField(max_length=150, blank=False, null=False, verbose_name="Nombres")
    email = models.EmailField(blank=False, null=False)
    phone = models.CharField(max_length=12, blank=False, null=False)
    street_address = models.TextField(max_length=255, blank=False, null=False, verbose_name='Dirección de la calle')
    city = models.CharField(max_length=100, blank=False, null=False)
    zip_code = models.CharField(max_length=10, blank=False, null=False)
    delivery = models.CharField(max_length=2, choices=[('ST', 'Estándar'), ('EX', 'Rápida')], default='ST',
                                verbose_name="Tipo de envio")

    class Meta:
        db_table = 'shipping'
        verbose_name = 'Envio'
        verbose_name_plural = '3. Envios'


    def __str__(self):
        return self.names_shipping