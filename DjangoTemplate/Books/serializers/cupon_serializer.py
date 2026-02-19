from django.utils import timezone

from rest_framework import serializers

from Books.models import CuponModel


class CuponSerializer(serializers.ModelSerializer):
    code = serializers.CharField(required=True)

    class Meta:
        model = CuponModel
        fields = ('code',)


    def validate(self, attrs):
        code = attrs.get('code')

        cupon = CuponModel.objects.filter(code=code, is_active=True).first()

        if not cupon:
            raise serializers.ValidationError('El cupon no existe')

        now = timezone.now()
        if not (now <= cupon.valid_to and now>=cupon.valid_from):
            raise serializers.ValidationError('El cupon no puede expirar')

        return {
            'id': cupon.id,
            'code': cupon.code,
            'discount': cupon.discount
        }