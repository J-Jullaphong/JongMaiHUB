from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticated
from ..renderers import EncryptorRenderer
from ..models import Appointment
from ..serializers import AppointmentSerializer 


class ListAppointment(generics.ListCreateAPIView):
    """ListAppointment displays a list of all Appointment."""
    permission_classes = (IsAuthenticated,)
    renderer_classes = [EncryptorRenderer]
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = "__all__"
    