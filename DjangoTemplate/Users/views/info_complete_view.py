from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from Users.serializers import InfoSerializer


class InfoPersonalView(GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = InfoSerializer

    def get(self, request, *args, **kwargs):
        info = request.user.info
        serializer = self.get_serializer(info)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, *args, **kwargs):
        info = request.user.info
        serializer = self.get_serializer(info, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)