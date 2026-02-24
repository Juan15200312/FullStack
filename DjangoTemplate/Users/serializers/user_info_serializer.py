from rest_framework import serializers

from Users.models import CustomUser, InfoUserModel


class UserInfoSerializer(serializers.ModelSerializer):
    photo_perfil = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ('names', 'email', 'photo_perfil')


    def get_photo_perfil(self, obj):
        info = getattr(obj, 'info', None)

        if info and info.photo_perfil:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(info.photo_perfil.url)
            return ''
        return ''



