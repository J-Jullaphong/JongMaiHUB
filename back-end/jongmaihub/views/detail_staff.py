from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from ..renderers import EncryptorRenderer
from ..models import Staff
from ..serializers import StaffSerializer


class DetailStaff(generics.RetrieveUpdateDestroyAPIView):
    """DetailStaff displays details of a Staff."""
    permission_classes = (IsAuthenticated,)
    renderer_classes = [EncryptorRenderer]
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer
    