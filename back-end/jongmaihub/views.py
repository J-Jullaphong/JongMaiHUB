from rest_framework import generics
from .serializers import *


class ListServiceProvider(generics.ListCreateAPIView):
    """ListServiceProvider displays a list of all Service Provider."""
    queryset = ServiceProvider.objects.all()
    serializer_class = ServiceProviderSerializer


class DetailServiceProvider(generics.RetrieveUpdateDestroyAPIView):
    """DetailServiceProvider displays details of a Service Provider."""
    queryset = ServiceProvider.objects.all()
    serializer_class = ServiceProviderSerializer


class ListService(generics.ListCreateAPIView):
    """ListService displays a list of all Service."""
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer


class DetailService(generics.RetrieveUpdateDestroyAPIView):
    """DetailService displays details of a Service."""
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
