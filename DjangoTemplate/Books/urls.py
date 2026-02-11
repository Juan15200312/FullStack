from django.conf import settings
from django.conf.urls.static import static
from django.urls import path

from Books.views import CategoryView, BookView

urlpatterns = [
    path('categories/', CategoryView.as_view(), name='categories'),
    path('books/<str:category>/', BookView.as_view(), name='books'),
]
