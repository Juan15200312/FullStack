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

    def get_queryset(self, *args, **kwargs):
        user = self.request.user
        return user.wishlist.all()

