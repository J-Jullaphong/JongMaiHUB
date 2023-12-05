from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from ..renderers import EncryptorRenderer
from ..models import Appointment
from ..serializers import AppointmentSerializer


class DetailAppointment(generics.RetrieveUpdateDestroyAPIView):
    """DetailAppointment displays details of an Appointment."""
    permission_classes = (IsAuthenticated,)
    renderer_classes = [EncryptorRenderer]
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    