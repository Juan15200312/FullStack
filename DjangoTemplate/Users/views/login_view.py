from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from Users.serializers import LoginSerializer
from utils import order_errors


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):

        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.validated_data, status=status.HTTP_200_OK)

        error_messages = order_errors(serializer.errors)
        return Response({'errors': error_messages}, status=status.HTTP_400_BAD_REQUEST)

