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
            'profile_picture',
            'cover_picture',
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
            'service_picture',
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
            'profile_picture',
        )
        model = Staff


class CustomerSerializer(serializers.ModelSerializer):
    """Serializer for Customer model."""
    class Meta:
        fields = (
            'uid',
            'name',
            'phone_number',
            'email',
        )
        model = Customer


class AppointmentSerializer(serializers.ModelSerializer):
    """Serializer for Appointment model."""
    class Meta:
        fields = (
            'customer',
            'service',
            'staff',
            'date_time',
        )
        model = Appointment


class RatingSerializer(serializers.ModelSerializer):
    """Serializer for Rating model."""
    class Meta:
        fields = (
            'appointment',
            'rating',
        )
        model = Rating
