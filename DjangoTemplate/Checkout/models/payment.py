from django.db import models

class PaymentModel(models.Model):

    class MethodPayment(models.TextChoices):
        DEBIT_CARD = 'DC', 'Tarjeta de Débito'
        PAYPAL = 'PP', 'PayPal'
        STRIPE = 'ST', 'Transferencia'

    names = models.CharField(max_length=150, blank=False, null=False)
    card_number = models.CharField(max_length=19, blank=False, null=False)
    exp = models.CharField(max_length=5, blank=False, null=False)
    cvv = models.CharField(max_length=3, blank=False, null=False)
    method = models.CharField(
        max_length=2,
        choices=MethodPayment.choices,
        default=MethodPayment.DEBIT_CARD,
    )

    class Meta:
        db_table = 'payment'
        verbose_name = 'Payment'
        verbose_name_plural = '3. Payments'

