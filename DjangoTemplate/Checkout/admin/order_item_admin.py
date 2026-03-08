from django.contrib import admin

from Checkout.models import OrderItemModel


class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'order', 'title_x', 'unit_price', 'count')

admin.site.register(OrderItemModel, OrderItemAdmin)



