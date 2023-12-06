from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from ..renderers import EncryptorRenderer
from ..models import Staff
from ..serializers import StaffSerializer


class ListStaff(generics.ListCreateAPIView):
    """ListStaff displays a list of all Staff."""
    permission_classes = (IsAuthenticated,)
    renderer_classes = [EncryptorRenderer]
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = "__all__"
    