from django.contrib import admin

from Users.models import InfoUserModel

class InfoUserAdmin(admin.ModelAdmin):
    list_display = ('user__names', 'phone')

admin.site.register(InfoUserModel, InfoUserAdmin)