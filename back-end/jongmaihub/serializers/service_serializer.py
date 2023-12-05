from rest_framework import serializers
from ..models import Service


class ServiceSerializer(serializers.ModelSerializer):
    """Serializer for Service model."""
    class Meta:
        fields = "__all__"
        model = Service
        