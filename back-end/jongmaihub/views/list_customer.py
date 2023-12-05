from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticated
from ..renderers import EncryptorRenderer
from ..models import Customer
from ..serializers import CustomerSerializer


class ListCustomer(generics.ListCreateAPIView):
    """ListCustomer displays a list of all Customer."""
    permission_classes = (IsAuthenticated,)
    renderer_classes = [EncryptorRenderer]
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = "__all__"
    