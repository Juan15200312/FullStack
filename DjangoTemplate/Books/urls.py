from django.urls import path, include
from rest_framework import routers

from Books.views import CategoryView, BookView, WishlistView, CuponView, BookDetailView, NewArrivalsView

router = routers.DefaultRouter()
router.register('', WishlistView, basename='wishlist')


urlpatterns = [
    path('categories/', CategoryView.as_view(), name='categories'),
    path('books/category/<str:category>/', BookView.as_view(), name='books'),
    path('wishlist/', include(router.urls)),
    path('cupon/', CuponView.as_view(), name='cupons'),
    path('books/<str:slug>/', BookDetailView.as_view(), name='book_detail'),
    path('books/new-arrivals/all/', NewArrivalsView.as_view(), name='new_arrivals'),
]
