from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.db import models


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
    names = models.CharField(max_length=255, null=False, blank=False, verbose_name="Nombres")
    email = models.EmailField(max_length=255, unique=True, null=False, blank=False,verbose_name='Correo electrónico')
    phone = models.CharField(max_length=11, unique=True, verbose_name='Teléfono')


    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = CustomManagerUser()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['names', 'phone']

    def __str__(self):
        return self.names

    class Meta:
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'
        db_table = 'usuarios'


