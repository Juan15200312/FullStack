from django.urls import path

from Checkout.views import SearchOrderView, OrderView, OrderDetailPartView

urlpatterns = [
    path('order/', OrderView.as_view(), name='order'),
    path('order/<str:slug>/', SearchOrderView.as_view(), name='order_detail'),
    path('orders-part/', OrderDetailPartView.as_view(), name='order_detail_part'),

]