from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from Books.serializers import CuponSerializer
from utils import order_errors


class CuponView(GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = CuponSerializer

    def get_queryset(self):
        return self.serializer_class.Meta.model.objects.filter(is_active=True).all()

    def post(self,request ,*args, **kwargs):

        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        return Response(order_errors(serializer.errors), status=status.HTTP_400_BAD_REQUEST)
