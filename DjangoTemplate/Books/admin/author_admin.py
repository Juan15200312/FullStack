from django.contrib import admin
from Books.models import AuthorModel


class AuthorAdmin(admin.ModelAdmin):
    list_display = ('id', 'names',)
    search_fields = ('names', 'slug')

admin.site.register(AuthorModel, AuthorAdmin)