from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from ..renderers import EncryptorRenderer
from ..models import Service
from ..serializers import ServiceSerializer


class DetailService(generics.RetrieveUpdateDestroyAPIView):
    """DetailService displays details of a Service."""
    permission_classes = (IsAuthenticated,)
    renderer_classes = [EncryptorRenderer]
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    