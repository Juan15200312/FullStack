import datetime

from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models


class CuponModel(models.Model):
    code = models.CharField(blank=False, null=False, verbose_name='Código de promoción')
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

    @property
    def is_valid(self):
        now = datetime.datetime.now()
        return True if (now <= self.valid_to and now>=self.valid_from) else False


