from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from Users.models import CustomUser
from Users.serializers.user_info_serializer import UserInfoSerializer


class UserInfoView(GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserInfoSerializer
    queryset = CustomUser.objects.all()

    def get(self,request, *args, **kwargs):
        user = request.user
        serializer = self.get_serializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
