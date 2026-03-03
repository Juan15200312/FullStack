from rest_framework import serializers


class UpdatePasswordSerializer(serializers.Serializer):
    currentPassword = serializers.CharField(required=True)
    password1 = serializers.CharField(required=True, min_length=8)
    password2 = serializers.CharField(required=True)

    def validate(self, data):
        user = self.context['request'].user

        currentPassword = data.get('currentPassword')
        password1 = data.get('password1')
        password2 = data.get('password2')


        if not user.check_password(currentPassword):
            raise serializers.ValidationError('¡La contraseña actual es incorrecta!')

        if password1 != password2:
            raise serializers.ValidationError('¡Las contraseñas no coinciden!')

        return data


    def save(self, **kwargs):
        user = self.context['request'].user
        password = self.validated_data.get('password1')
        user.set_password(password)
        user.save()
        return user



