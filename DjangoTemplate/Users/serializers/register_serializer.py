import re
from rest_framework import serializers
from Users.models import CustomUser


def validarPassword(password):
    errors = []
    # 1. Comprobar minúsculas
    if not re.search(r'[a-z]', password):
        errors.append("Falta al menos una letra minúscula.")

    # 2. Comprobar mayúsculas
    if not re.search(r'[A-Z]', password):
        errors.append("Falta al menos una letra mayúscula.")

    # 3. Comprobar número O símbolo (la condición que pediste)
    if not re.search(r'[\d\W_]', password):
        errors.append("Falta un número o un símbolo especial.")

    if errors:
        raise serializers.ValidationError(errors)
    return password


class RegisterSerializer(serializers.ModelSerializer):
    names = serializers.CharField(max_length=50, required=True)
    email = serializers.EmailField(max_length=150, required=True)
    password1 = serializers.CharField(min_length=8, required=True)
    password2 = serializers.CharField(min_length=8, required=True)

    class Meta:
        model = CustomUser
        fields = ('names', 'email', 'password1','password2')

    def validate_email(self, email):
        if CustomUser.objects.filter(email=email).exists():
            raise serializers.ValidationError('Ya existe un usuario con ese email')
        return email

    def validate_password1(self, password1):
        return validarPassword(password1)

    def validate_password2(self, password2):
        return validarPassword(password2)

    def validate(self, data):
        if data.get('password1') != data.get('password2'):
            raise serializers.ValidationError('Las contraseñas no coinciden')
        return data

    def create(self, validated_data):
        password = validated_data.pop('password1')
        validated_data.pop('password2')

        user = CustomUser.objects.create(
            names = validated_data.get('names'),
            email= validated_data.get('email'),
        )
        print(user)

        user.set_password(password)
        user.save()
        return user

