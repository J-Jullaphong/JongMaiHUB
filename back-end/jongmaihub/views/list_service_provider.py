from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from ..renderers import EncryptorRenderer
from ..models import ServiceProvider
from ..serializers import ServiceProviderSerializer


class ListServiceProvider(generics.ListCreateAPIView):
    """ListServiceProvider displays a list of all Service Provider."""
    permission_classes = (IsAuthenticated,)
    renderer_classes = [EncryptorRenderer]
    queryset = ServiceProvider.objects.all()
    serializer_class = ServiceProviderSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = "__all__"
    