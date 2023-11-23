from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import ServiceProvider, Service, Staff, Customer, Appointment, Rating
from .serializers import ServiceProviderSerializer, ServiceSerializer, StaffSerializer, CustomerSerializer, \
    AppointmentSerializer, RatingSerializer


class ListServiceProvider(generics.ListCreateAPIView):
    """ListServiceProvider displays a list of all Service Provider."""
    permission_classes = (IsAuthenticated,)
    queryset = ServiceProvider.objects.all()
    serializer_class = ServiceProviderSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = "__all__"


class DetailServiceProvider(generics.RetrieveUpdateDestroyAPIView):
    """DetailServiceProvider displays details of a Service Provider."""
    permission_classes = (IsAuthenticated,)
    queryset = ServiceProvider.objects.all()
    serializer_class = ServiceProviderSerializer


class ListService(generics.ListCreateAPIView):
    """ListService displays a list of all Service."""
    permission_classes = (IsAuthenticated,)
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = "__all__"


class DetailService(generics.RetrieveUpdateDestroyAPIView):
    """DetailService displays details of a Service."""
    permission_classes = (IsAuthenticated,)
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer


class ListStaff(generics.ListCreateAPIView):
    """ListStaff displays a list of all Staff."""
    permission_classes = (IsAuthenticated,)
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = "__all__"


class DetailStaff(generics.RetrieveUpdateDestroyAPIView):
    """DetailStaff displays details of a Staff."""
    permission_classes = (IsAuthenticated,)
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer


class ListCustomer(generics.ListCreateAPIView):
    """ListCustomer displays a list of all Customer."""
    permission_classes = (IsAuthenticated,)
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = "__all__"


class DetailCustomer(generics.RetrieveUpdateDestroyAPIView):
    """DetailCustomer displays details of a Customer."""
    permission_classes = (IsAuthenticated,)
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


class ListAppointment(generics.ListCreateAPIView):
    """ListAppointment displays a list of all Appointment."""
    permission_classes = (IsAuthenticated,)
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = "__all__"


class DetailAppointment(generics.RetrieveUpdateDestroyAPIView):
    """DetailAppointment displays details of an Appointment."""
    permission_classes = (IsAuthenticated,)
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer


class ListRating(generics.ListCreateAPIView):
    """ListRating displays a list of all Rating."""
    permission_classes = (IsAuthenticated,)
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = "__all__"


class DetailRating(generics.RetrieveUpdateDestroyAPIView):
    """DetailRating displays details of a Rating."""
    permission_classes = (IsAuthenticated,)
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer


class ListAppointmentsByProvider(generics.ListAPIView):
    """ListAppointmentsByProvider displays Appointment that belongs to the Provider."""
    permission_classes = (IsAuthenticated,)
    serializer_class = AppointmentSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['staff__service_provider__uid']

    def get_queryset(self):
        provider_uid = self.kwargs['provider_uid']
        return Appointment.objects.filter(staff__service_provider__uid=provider_uid)
