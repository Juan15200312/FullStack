import os
import uuid
from django.db import models
from PIL import Image

def pathImage(instance, filename):
    ext = filename.split('.')[-1]
    filename = f"{uuid.uuid4().hex}.{ext}"
    return os.path.join('images/authors', instance.slug, filename)


class AuthorModel(models.Model):
    names = models.CharField(max_length=100, null=False, blank=False)
    bio  = models.TextField(null=False, blank=False)
    slug = models.SlugField(max_length=100, null=True, blank=True)
    photo_perfil = models.ImageField(upload_to=pathImage)


    def __str__(self):
        return self.names

    class Meta:
        db_table = 'author_book'
        verbose_name = 'Autor'
        verbose_name_plural = '3. Autores'

    def save(self, *args, **kwargs):
        if not self.slug:
            provisional = uuid.uuid4().hex

            while AuthorModel.objects.filter(slug=provisional).exists():
                provisional = uuid.uuid4().hex

            self.slug = provisional
        return super().save(*args, **kwargs)