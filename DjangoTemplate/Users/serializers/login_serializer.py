from rest_framework import serializers
import re
from rest_framework_simplejwt.tokens import RefreshToken
from Users.models import CustomUser


class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255, required=True)
    password = serializers.CharField(min_length=8, max_length=128, required=True)

    class Meta:
        model = CustomUser
        fields = ('email', 'password')


    def validate_email(self, email):
        if email == '':
            raise serializers.ValidationError('Email es requerido')

        if "@" not in email:
            raise serializers.ValidationError('Email no valido')

        return email


    def validate_password(self, password):
        if password == '':
            raise serializers.ValidationError('Password es requerido')

        if len(password) < 8:
            raise serializers.ValidationError('Password no valida: minimo 8 caracteres')

        return password


    def validate(self, data):
        email = data.get("email", '')
        password = data.get("password", '')

        user = CustomUser.objects.filter(email=email).first()

        if not user:
            raise serializers.ValidationError('El usuario no existe')

        if not user.check_password(password):
            raise serializers.ValidationError('Contraseña incorrecta')


        refresh_token = RefreshToken.for_user(user)
        access_token = refresh_token.access_token
        info = getattr(user, 'info', None)

        return {
            'success': True,
            'message': f'Bienvenido {user.names}',
            'data': {
                'user': {
                    'names': user.names,
                    'email': user.email,
                    'photo_perfil': info.photo_perfil.url if info and info.photo_perfil else '',
                },
                'access_token': str(access_token),
                'refresh_token': str(refresh_token)
            }
        }