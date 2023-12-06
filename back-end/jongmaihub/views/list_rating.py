from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticated
from ..renderers import EncryptorRenderer
from ..models import Rating
from ..serializers import RatingSerializer 


class ListRating(generics.ListCreateAPIView):
    """ListRating displays a list of all Rating."""
    permission_classes = (IsAuthenticated,)
    renderer_classes = [EncryptorRenderer]
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = "__all__"
    