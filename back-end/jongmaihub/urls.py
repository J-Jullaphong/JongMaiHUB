from django.urls import path
from .views import *


app_name = 'jongmaihub'

urlpatterns = [
    path('service-provider/', ListServiceProvider.as_view()),
    path('service-provider/<str:pk>/', DetailServiceProvider.as_view()),
    path('service/', ListService.as_view()),
    path('service/<int:pk>/', DetailService.as_view()),
    path('staff/', ListStaff.as_view()),
    path('staff/<str:pk>/', DetailStaff.as_view()),
    path('customer/', ListCustomer.as_view()),
    path('customer/<str:pk>/', DetailCustomer.as_view()),
    path('appointment/', ListAppointment.as_view()),
    path('appointment/<int:pk>/', DetailAppointment.as_view()),
    path('rating/', ListRating.as_view()),
    path('rating/<int:pk>/', DetailRating.as_view()),
    path('appointments-provider/<str:provider_uid>/', ListAppointmentsByProvider.as_view()),
]
