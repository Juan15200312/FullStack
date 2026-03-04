from django.contrib import admin

from Checkout.models import OrderModel


class OrderAdmin(admin.ModelAdmin):
    list_display = ('user', 'names_shipping', 'delivery', 'email', 'street_address' ,'total', 'status')
    list_filter = ('status', 'city')
    list_editable = ('status',)

admin.site.register(OrderModel, OrderAdmin)
