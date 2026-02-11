from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from unicodedata import category

from Books.serializers import BookSerializer


class BookView(GenericAPIView):
    serializer_class = BookSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        category = self.kwargs.get('category')
        if category == 'all':
            return self.serializer_class.Meta.model.objects.all()
        query = self.serializer_class.Meta.model.objects.filter(categories__slug=category).all()
        return query


    def get(self, request, *args, **kwargs):
        serializer = self.get_serializer(self.get_queryset(), many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
