from rest_framework import serializers
from ..models import Staff


class StaffSerializer(serializers.ModelSerializer):
    """Serializer for Staff model."""
    class Meta:
        fields = "__all__"
        model = Staff
        