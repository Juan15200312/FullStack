from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from Books.models import CategoryModel
from Books.serializers import BookSerializer


class BookView(GenericAPIView):
    serializer_class = BookSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        category_slug = self.kwargs.get('category')
        if category_slug == 'all':
            return self.serializer_class.Meta.model.objects.order_by('title').all()
        query = self.serializer_class.Meta.model.objects.filter(categories__slug=category_slug).order_by('title').all()
        return query

    def get(self, request, *args, **kwargs):
        serializer = self.get_serializer(self.get_queryset(), many=True)

        category_slug = self.kwargs.get('category')

        if category_slug == 'all':
            return Response({
                'category': {
                    'name': 'Todos',
                    'slug': 'all',
                },
                'count': self.get_queryset().count(),
                'books': serializer.data
            }, status=status.HTTP_200_OK)


        category = CategoryModel.objects.filter(slug=category_slug).first()
        if category:
            return Response({
                'category': {
                    'name': category.name,
                    'slug': category_slug,
                },
                'count': self.get_queryset().count(),
                'books': serializer.data
            }, status=status.HTTP_200_OK)

        return Response({'error': 'Categoria no encontrada'}, status=status.HTTP_400_BAD_REQUEST)


