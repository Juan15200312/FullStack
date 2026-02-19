import datetime

from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models


class CuponModel(models.Model):
    code = models.CharField(max_length=100, blank=False, null=False, verbose_name='Código de promoción')
    valid_from = models.DateTimeField(blank=False, null=False, verbose_name='Valido desde')
    valid_to = models.DateTimeField(blank=False, null=False, verbose_name='Valido hasta')

    discount = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        verbose_name='Descuento (%)'
    )

    is_active = models.BooleanField(default=True, verbose_name='¿Esta activo?')

    class Meta:
        verbose_name = "Cupón"
        verbose_name_plural = "4. Cupones"

    def __str__(self):
        return self.code



