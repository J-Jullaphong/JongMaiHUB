from rest_framework import serializers
from ..models import Rating


class RatingSerializer(serializers.ModelSerializer):
    """Serializer for Rating model."""
    class Meta:
        fields = "__all__"
        model = Rating
        