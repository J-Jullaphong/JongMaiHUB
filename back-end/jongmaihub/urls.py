from django.urls import path
from . import views

app_name = 'jongmaihub'

urlpatterns = [
    path('service-provider/', views.ListServiceProvider.as_view()),
    path('service-provider/<str:pk>/', views.DetailServiceProvider.as_view()),
    path('service/', views.ListService.as_view()),
    path('service/<int:pk>/', views.DetailService.as_view()),
    path('staff/', views.ListStaff.as_view()),
    path('staff/<str:pk>/', views.DetailStaff.as_view()),
    path('customer/', views.ListCustomer.as_view()),
    path('customer/<str:pk>/', views.DetailCustomer.as_view()),
    path('appointment/', views.ListAppointment.as_view()),
    path('appointment/<int:pk>/', views.DetailAppointment.as_view()),
    path('rating/', views.ListRating.as_view()),
    path('rating/<int:pk>/', views.DetailRating.as_view()),
]
