from rest_framework import serializers
from ..models import Appointment


class AppointmentSerializer(serializers.ModelSerializer):
    """Serializer for Appointment model."""
    class Meta:
        fields = "__all__"
        model = Appointment
