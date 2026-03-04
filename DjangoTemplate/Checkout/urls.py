from django.urls import path

from Checkout.views import SearchOrderView, OrderView

urlpatterns = [
    path('order/', OrderView.as_view(), name='order'),
    path('order/<str:slug>/', SearchOrderView.as_view(), name='search'),


]