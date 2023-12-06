from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticated
from ..renderers import EncryptorRenderer
from ..models import Appointment
from ..serializers import AppointmentSerializer 


class ListAppointmentsByProvider(generics.ListAPIView):
    """ListAppointmentsByProvider displays Appointment that belongs to the Provider."""
    permission_classes = (IsAuthenticated,)
    renderer_classes = [EncryptorRenderer]
    serializer_class = AppointmentSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['staff__service_provider__uid']

    def get_queryset(self):
        provider_uid = self.kwargs['provider_uid']
        return Appointment.objects.filter(staff__service_provider__uid=provider_uid)
