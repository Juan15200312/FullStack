from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from Books.models import CategoryModel
from Books.serializers.category_serializer import CategorySerializer


class CategoryView(GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = CategorySerializer

    def get_queryset(self):
        return CategoryModel.objects.filter(is_active=True).order_by('name').all()

    def get(self, request, *args, **kwargs):
        serializer = self.serializer_class(self.get_queryset(), many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

