from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from Books.serializers import BookSerializer


class NewArrivalsView(GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = BookSerializer

    def get_queryset(self):
        return self.serializer_class.Meta.model.objects.all().order_by('-created_at', 'title')[:10]

    def get(self, request, *args, **kwargs):
        serializer = self.get_serializer(self.get_queryset(), many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)