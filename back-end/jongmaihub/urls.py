from django.urls import path
from . import views


urlpatterns = [
    path('', views.ListServiceProvider.as_view()),
    path('<int:pk>/', views.DetailServiceProvider.as_view()),
    path('', views.ListService.as_view()),
    path('<int:pk>/', views.DetailService.as_view()),
    path('', views.ListStaff.as_view()),
    path('<int:pk>/', views.DetailStaff.as_view()),
    path('', views.ListCustomer.as_view()),
    path('<int:pk>/', views.DetailCustomer.as_view()),
    path('', views.ListAppointment.as_view()),
    path('<int:pk>/', views.DetailAppointment.as_view()),
    path('', views.ListRating.as_view()),
    path('<int:pk>/', views.DetailRating.as_view()),
]