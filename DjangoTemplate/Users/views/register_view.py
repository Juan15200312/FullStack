from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from Users.serializers import RegisterSerializer


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({'success': True, 'message': 'Usuario creado correctamente'},
                            status=status.HTTP_201_CREATED)
        else:
            return Response({'success': False, 'error': serializer.errors},
                            status=status.HTTP_400_BAD_REQUEST)

