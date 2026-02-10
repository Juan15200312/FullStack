from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.db import models
import uuid


class CustomManagerUser(BaseUserManager):
    def create_user(self, email=None, password=None, **extra_fields):
        if not email or not password:
            raise ValueError('Se necesita del correo electrónico y contraseña para poder crear un usuario')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    names = models.CharField(max_length=50, null=False, blank=False, verbose_name="Nombres")
    email = models.EmailField(max_length=255, unique=True, null=False, blank=False,verbose_name='Correo electrónico')
    slug = models.CharField(max_length=64, null=True, blank=True)

    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = CustomManagerUser()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['names',]

    def __str__(self):
        return self.names

    def save(self, *args, **kwargs):
        if not self.slug:
            provisional = uuid.uuid4().hex
            while CustomUser.objects.filter(slug=provisional).exists():
                provisional = uuid.uuid4().hex

            self.slug = provisional
        return super().save(*args,**kwargs)

    class Meta:
        db_table = 'usuarios'
        verbose_name = 'Usuario'
        verbose_name_plural = '1. Usuarios'


