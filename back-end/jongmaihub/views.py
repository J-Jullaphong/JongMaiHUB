from rest_framework import generics
from .serializers import *
from django_filters.rest_framework import DjangoFilterBackend


class ListServiceProvider(generics.ListCreateAPIView):
    """ListServiceProvider displays a list of all Service Provider."""
    queryset = ServiceProvider.objects.all()
    serializer_class = ServiceProviderSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = "__all__"


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


class ListStaff(generics.ListCreateAPIView):
    """ListStaff displays a list of all Staff."""
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer


class DetailStaff(generics.RetrieveUpdateDestroyAPIView):
    """DetailStaff displays details of a Staff."""
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer


class ListCustomer(generics.ListCreateAPIView):
    """ListCustomer displays a list of all Customer."""
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


class DetailCustomer(generics.RetrieveUpdateDestroyAPIView):
    """DetailCustomer displays details of a Customer."""
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


class ListAppointment(generics.ListCreateAPIView):
    """ListAppointment displays a list of all Appointment."""
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = "__all__"
    # filterset_fields = ["customer", "staff", "id"]


class DetailAppointment(generics.RetrieveUpdateDestroyAPIView):
    """DetailAppointment displays details of an Appointment."""
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer


class ListRating(generics.ListCreateAPIView):
    """ListRating displays a list of all Rating."""
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer


class DetailRating(generics.RetrieveUpdateDestroyAPIView):
    """DetailRating displays details of a Rating."""
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
