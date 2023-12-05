from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from ..renderers import EncryptorRenderer
from ..models import Rating
from ..serializers import RatingSerializer

class DetailRating(generics.RetrieveUpdateDestroyAPIView):
    """DetailRating displays details of a Rating."""
    permission_classes = (IsAuthenticated,)
    renderer_classes = [EncryptorRenderer]
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    