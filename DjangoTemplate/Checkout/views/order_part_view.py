from rest_framework import status
from rest_framework.generics import GenericAPIView, ListAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from Checkout.models import OrderModel
from Checkout.serializers import OrderDetailPartSerializer

class OrderPagination(PageNumberPagination):
    page_size = 5

class OrderDetailPartView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OrderDetailPartSerializer
    pagination_class = OrderPagination

    def get_queryset(self):
        return OrderModel.objects.all().filter(user=self.request.user).order_by('-created_at')
