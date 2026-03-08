from rest_framework import status
from rest_framework.generics import GenericAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from Checkout.serializers import SearchOrderSerializer


class SearchOrderView(GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = SearchOrderSerializer

    def get(self, request, *args, **kwargs):
        slug = self.kwargs.get('slug')
        email = request.query_params.get('email')

        serializer = self.get_serializer(data={'slug': slug, 'email': email})
        if serializer.is_valid():
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


