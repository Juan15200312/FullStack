from Users.models import CustomUser
from django.contrib import admin


class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('names', 'email', 'is_active', 'is_staff')
    list_editable = ('is_staff', 'is_active')

    list_filter = ('is_staff', 'is_active')
    search_fields = ('names', 'email')
    list_per_page = 20

admin.site.register(CustomUser, CustomUserAdmin)