from rest_framework import serializers

from Books.models import CuponModel


class CuponSerializer(serializers.ModelSerializer):
    code = serializers.CharField(required=True)

    class Meta:
        model = CuponModel
        fields = ('id', 'code', )

