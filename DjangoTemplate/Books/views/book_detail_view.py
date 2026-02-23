from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import AllowAny

from Books.serializers import BookSerializer


class BookDetailView(RetrieveAPIView):
    serializer_class = BookSerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'

    def get_queryset(self):
        return self.serializer_class.Meta.model.objects.all()

