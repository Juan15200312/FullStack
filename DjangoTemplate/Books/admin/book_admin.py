from django.contrib import admin
from Books.models import BookModel


class BookAdmin(admin.ModelAdmin):
    pass

admin.site.register(BookModel, BookAdmin)
