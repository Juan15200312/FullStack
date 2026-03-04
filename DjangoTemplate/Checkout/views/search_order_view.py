from rest_framework import status
from rest_framework.generics import GenericAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from Checkout.serializers import OrderSerializer


class SearchOrderView(RetrieveAPIView):
    permission_classes = [AllowAny]
    serializer_class = OrderSerializer
    lookup_field = 'slug'

    def get_object(self):
        pass


