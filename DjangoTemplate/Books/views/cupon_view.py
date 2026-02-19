from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from Books.serializers import CuponSerializer


class CuponView(GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = CuponSerializer

    def get_queryset(self):
        return self.serializer_class.Meta.model.objects.all()

    def post(self,request ,*args, **kwargs):
        code = request.data.get('code')
        cupon = self.get_queryset().filter(code=code).first()

        if not cupon:
            return Response({'success': True}, status=status.HTTP_200_OK)

        return Response({'success': False}, status=status.HTTP_400_BAD_REQUEST)
