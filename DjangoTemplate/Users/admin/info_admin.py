from django.contrib import admin

from Users.models import InfoUserModel

class InfoUserAdmin(admin.ModelAdmin):
    list_display = ('user__names', 'phone', 'direction')
    list_editable = ('phone',)
    search_fields = ('user__names', 'phone', 'direction')

admin.site.register(InfoUserModel, InfoUserAdmin)