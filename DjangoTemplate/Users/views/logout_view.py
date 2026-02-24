from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken


class LogoutView(GenericAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        refresh_token = request.data.get('refresh_token')

        if not refresh_token:
            return Response({'error': 'Se necesita del refresh token para cerrar la sesion'},
                            status=status.HTTP_400_BAD_REQUEST)

        try:
            refresh = RefreshToken(refresh_token)
            refresh.blacklist()
            return Response({'message': 'Sesión cerrada correctamente'},
                            status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Token invalido o expirado'},
                            status=status.HTTP_400_BAD_REQUEST)
