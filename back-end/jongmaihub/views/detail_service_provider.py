from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from ..renderers import EncryptorRenderer
from ..models import ServiceProvider
from ..serializers import ServiceProviderSerializer


class DetailServiceProvider(generics.RetrieveUpdateDestroyAPIView):
    """DetailServiceProvider displays details of a Service Provider."""
    permission_classes = (IsAuthenticated,)
    renderer_classes = [EncryptorRenderer]
    queryset = ServiceProvider.objects.all()
    serializer_class = ServiceProviderSerializer
    