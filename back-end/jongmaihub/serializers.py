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


class StaffSerializer(serializers.ModelSerializer):
    """Serializer for Staff model."""
    class Meta:
        fields = (
            'uid',
            'name',
            'service_provider',
            'service',
            'specialty',
            'background',
            'start_work_time',
            'get_off_work_time',
        )
        model = Staff


