from rest_framework import serializers
from .models import ServiceProvider, Service, Staff, Customer, Appointment, Rating


class ServiceProviderSerializer(serializers.ModelSerializer):
    """Serializer for ServiceProvider model."""
    class Meta:
        fields = "__all__"
        model = ServiceProvider


class ServiceSerializer(serializers.ModelSerializer):
    """Serializer for Service model."""
    class Meta:
        fields = "__all__"
        model = Service


class StaffSerializer(serializers.ModelSerializer):
    """Serializer for Staff model."""
    class Meta:
        fields = "__all__"
        model = Staff


class CustomerSerializer(serializers.ModelSerializer):
    """Serializer for Customer model."""
    class Meta:
        fields = "__all__"
        model = Customer


class AppointmentSerializer(serializers.ModelSerializer):
    """Serializer for Appointment model."""
    class Meta:
        fields = "__all__"
        model = Appointment


class RatingSerializer(serializers.ModelSerializer):
    """Serializer for Rating model."""
    class Meta:
        fields = "__all__"
        model = Rating
