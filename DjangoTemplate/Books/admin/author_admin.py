from django.contrib import admin
from Books.models import AuthorModel


class AuthorAdmin(admin.ModelAdmin):
    pass

admin.site.register(AuthorModel, AuthorAdmin)