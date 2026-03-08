from django.contrib import admin

from Checkout.models import ShippingModel


class ShippingAdmin(admin.ModelAdmin):
    list_display = ('id','user','names_shipping', 'email', 'city', 'street_address', 'zip_code')

admin.site.register(ShippingModel, ShippingAdmin)