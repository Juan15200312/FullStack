from django.urls import path

from Users.views import RegisterView, LoginView, UserInfoView, LogoutView, UpdatePassword
from Users.views.info_complete_view import InfoPersonalView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('user-info/', UserInfoView.as_view(), name='user_info'),
    path('info-personal/', InfoPersonalView.as_view(), name='info_personal'),
    path('update-password/', UpdatePassword.as_view(), name='update_password'),
]