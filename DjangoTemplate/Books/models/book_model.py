import os
import uuid
from django.db import models
from django.utils.text import slugify


def pathImage(instance, filename):
    ext = filename.split('.')[-1]
    filename = f"{uuid.uuid4().hex}.{ext}"
    return os.path.join('images/books', instance.slug, filename)

class BookModel(models.Model):
    title = models.CharField(max_length=100, unique=True, null=False, blank=False)
    description = models.TextField(null=False, blank=False)
    isbn = models.CharField(max_length=13, unique=True, null=False, blank=False)
    categories = models.ManyToManyField('CategoryModel', related_name='books')
    authors = models.ManyToManyField('AuthorModel', related_name='books')
    year = models.PositiveIntegerField(null=False, blank=False)
    stock = models.PositiveIntegerField(null=False, blank=False, default=0)
    price = models.FloatField(null=False, blank=False, default=0)
    image = models.ImageField(upload_to=pathImage, null=False, blank=False)

    is_book_of_the_month = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    slug = models.SlugField(max_length=100, unique=True, null=False, blank=False)


    def __str__(self):
        return self.title

    class Meta:
        db_table = 'books'
        verbose_name = 'Libro'
        verbose_name_plural = '1. Libros'

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)