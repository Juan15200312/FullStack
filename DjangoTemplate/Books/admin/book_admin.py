from django.contrib import admin
from Books.models import BookModel


class BookAdmin(admin.ModelAdmin):
    list_display = ('title', 'stock','price', 'year' ,'is_active')
    list_editable = ('stock','price','year','is_active')
    list_filter = ('stock','price','year','is_active')
    search_fields = ('title', 'slug')
    ordering = ('-created_at', )

admin.site.register(BookModel, BookAdmin)
