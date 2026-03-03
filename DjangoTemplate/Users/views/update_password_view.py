from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from Users.serializers import UpdatePasswordSerializer
from utils import order_errors


class UpdatePassword(GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UpdatePasswordSerializer

    def patch(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if not serializer.is_valid():
            return Response(order_errors(serializer.errors), status=status.HTTP_400_BAD_REQUEST)

        serializer.save()
        return Response({'success': True, 'message': 'Se actualizo su contraseña correctamente'},
                        status=status.HTTP_200_OK)
