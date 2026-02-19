from rest_framework import status, viewsets
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from Books.models import BookModel
from Books.serializers import BookSerializer


class WishlistView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = BookSerializer
    lookup_field = 'slug'
    http_method_names = ['get', 'delete']

    def get_queryset(self, *args, **kwargs):
        user = self.request.user
        return user.wishlist.all()

    def destroy(self, *args, **kwargs):
        user = self.request.user
        slug = self.kwargs.get('slug')

        book = self.get_queryset().filter(slug=slug).first()

        if not book:
            return Response({'message': 'No se encontró el libro en su wishlist'},
                        status=status.HTTP_204_NO_CONTENT)

        user.wishlist.remove(book)
        return Response({'message': 'Libro eliminado de su wishlist'},
                        status=status.HTTP_204_NO_CONTENT)

