from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from Users.serializers import RegisterSerializer
from utils import order_errors


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({'success': True, 'message': 'Se realizo el registro correctamente'},
                            status=status.HTTP_201_CREATED)

        error_messages = order_errors(serializer.errors)
        return Response({'success': False, 'errors': error_messages},
                            status=status.HTTP_400_BAD_REQUEST)

