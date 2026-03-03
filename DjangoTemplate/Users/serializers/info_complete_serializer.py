from rest_framework import serializers

from Users.models import InfoUserModel


class InfoSerializer(serializers.ModelSerializer):
    names = serializers.CharField(source='user.names')
    email = serializers.CharField(source='user.email')

    class Meta:
        model = InfoUserModel
        fields = ('names', 'email', 'photo_perfil', 'phone',
                  'date_birth')


    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)

        if user_data:
            user = instance.user
            user.names = user_data.get('names', user.names)
            user.email = user_data.get('email', user.email)

            user.save()

        return super().update(instance, validated_data)