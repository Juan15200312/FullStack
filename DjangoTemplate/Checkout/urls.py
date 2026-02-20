from django.urls import path
from Checkout.views.order_view import OrderView

urlpatterns = [
    path('order/', OrderView.as_view(), name='order'),


]