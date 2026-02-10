import os
import uuid
from PIL import Image
from django.db import models
from django.utils.text import slugify


def pathImage(instance, filename):
    ext = filename.split('.')[-1]
    filename = f"{uuid.uuid4().hex}.{ext}"
    return os.path.join('images/books/categories', instance.slug, filename)

class CategoryModel(models.Model):
    name = models.CharField(max_length=100, unique=True, null=False, blank=False)
    description = models.CharField(null=True, blank=True)
    slug = models.SlugField(max_length=100, unique=True, null=True, blank=True)
    icon = models.CharField(max_length=100, null=True, blank=True)
    color = models.CharField(max_length=100, null=True, blank=True)
    imagen = models.ImageField(upload_to=pathImage, null=True, blank=True)

    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'category_book'
        verbose_name = 'Categoria'
        verbose_name_plural = '2. Categorías'

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
