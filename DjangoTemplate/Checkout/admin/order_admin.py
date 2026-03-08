from django.contrib import admin

from Checkout.models import OrderModel


class OrderAdmin(admin.ModelAdmin):
    list_display = ('id','user', 'shipping__names_shipping', 'shipping__delivery', 'shipping__email', 'shipping__street_address' ,'total', 'status')
    list_filter = ('status', 'shipping__city')
    list_editable = ('status',)

admin.site.register(OrderModel, OrderAdmin)
