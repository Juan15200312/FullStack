from django.urls import path

from Users.views import RegisterView, LoginView, UserInfoView, LogoutView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('user-info/', UserInfoView.as_view(), name='user_info'),

]