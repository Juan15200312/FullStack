from django.contrib import admin

from Books.models import CuponModel



class CuponAdmin(admin.ModelAdmin):
    list_display = ('code', 'valid_from', 'valid_to', 'discount' ,'is_active')
    list_editable = ('is_active', 'discount')

    list_filter = ('is_active', 'discount')
    search_fields = ('code', 'discount')


admin.site.register(CuponModel, CuponAdmin)