from django.contrib import admin

from Books.models import CategoryModel

class CategoryAdmin(admin.ModelAdmin):
    pass

admin.site.register(CategoryModel, CategoryAdmin)