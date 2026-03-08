from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from Checkout.serializers import OrderSerializer
from utils import order_errors


class OrderView(GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = OrderSerializer

    def post(self, request,*args, **kwargs):
        serializer = self.get_serializer(data=request.data, context={'request': request})

        if serializer.is_valid():
            order = serializer.save()
            return Response({
                'success': True,
                'data': {
                    'names_shipping': order.shipping.names_shipping,
                    'slug': order.slug
                }
            }, status=status.HTTP_200_OK)

        error_messages = order_errors(serializer.errors)
        return Response({'errors': error_messages}, status=status.HTTP_400_BAD_REQUEST)



