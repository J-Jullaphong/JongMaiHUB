from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from ..renderers import EncryptorRenderer
from ..models import Customer
from ..serializers import CustomerSerializer


class DetailCustomer(generics.RetrieveUpdateDestroyAPIView):
    """DetailCustomer displays details of a Customer."""
    permission_classes = (IsAuthenticated,)
    renderer_classes = [EncryptorRenderer]
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    