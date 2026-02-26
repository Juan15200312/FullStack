from django.contrib import admin

from Books.models import CategoryModel

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug','is_active')
    list_editable = ('is_active',)
    list_filter = ('is_active',)
    search_fields = ('name','slug')

admin.site.register(CategoryModel, CategoryAdmin)