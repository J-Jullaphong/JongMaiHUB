from rest_framework import serializers
from .models import *


class ServiceProviderSerializer(serializers.ModelSerializer):
    """Serializer for ServiceProvider model."""
    class Meta:
        fields = (
            'uid',
            'name',
            'location',
            'opening_time',
            'closing_time',
        )
        model = ServiceProvider


class ServiceSerializer(serializers.ModelSerializer):
    """Serializer for Service model."""
    class Meta:
        fields = (
            'name',
            'service_provider',
            'type',
            'duration',
            'price',
        )
        model = Service


