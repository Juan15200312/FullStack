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
    http_method_names = ['get', 'delete', 'post']

    def get_queryset(self, *args, **kwargs):
        user = self.request.user
        return user.wishlist.all()

    def destroy(self, *args, **kwargs):
        user = self.request.user
        slug = self.kwargs.get('slug')

        book = self.get_queryset().filter(slug=slug).first()

        if not book:
            return Response({'message': 'No se encontró el libro en su wishlist'},
                        status=status.HTTP_400_BAD_REQUEST)

        user.wishlist.remove(book)
        return Response({'message': 'Libro eliminado de su wishlist'},
                        status=status.HTTP_204_NO_CONTENT)

    def post(self, request, *args, **kwargs):
        user = self.request.user
        slug = self.kwargs.get('slug')
        book = self.serializer_class.Meta.model.objects.filter(slug=slug).first()

        if not book:
            return Response({'message': 'No se encontró el libro en nuestro inventario'},
                            status=status.HTTP_404_NOT_FOUND)

        if user.wishlist.filter(id=book.id).exists():
            return Response({'message': 'El libro ya se encuentra en su lista de deseos'},
                            status=status.HTTP_400_BAD_REQUEST)

        user.wishlist.add(book)
        return Response({'message': 'Se añadió con éxito el libro a su lista de deseos'},
                        status=status.HTTP_201_CREATED)
