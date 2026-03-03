import os.path
import uuid
from django.db import models
from PIL import Image


def pathImage(instance, filename):
    ext = filename.split('.')[-1]
    filename = f"{uuid.uuid4().hex}.{ext}"
    return os.path.join('images/profiles', instance.user.slug, filename)

class InfoUserModel(models.Model):
    user = models.OneToOneField('CustomUser', on_delete=models.CASCADE, related_name='info')
    direction = models.TextField(max_length=255, null=True, blank=True, verbose_name='Dirección')
    photo_perfil = models.ImageField(upload_to=pathImage, null=True, blank=True)
    phone = models.CharField(max_length=12, unique=True, verbose_name='Teléfono', null=True, blank=True)
    date_birth = models.DateField(null=True, blank=True, verbose_name='Fecha de nacimiento')

    class Meta:
        db_table = 'infoPersonal'
        verbose_name = 'Información Personal'
        verbose_name_plural = '2. Informaciones Personales'


    def __str__(self):
        return self.user.names

    def save(self, *args, **kwargs):
        if '+34' not in self.phone:
            self.phone = f'+34{self.phone}'
        return super().save(*args, **kwargs)