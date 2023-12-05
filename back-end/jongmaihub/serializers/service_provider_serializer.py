from rest_framework import serializers
from ..models import ServiceProvider


class ServiceProviderSerializer(serializers.ModelSerializer):
    """Serializer for ServiceProvider model."""
    class Meta:
        fields = "__all__"
        model = ServiceProvider
        