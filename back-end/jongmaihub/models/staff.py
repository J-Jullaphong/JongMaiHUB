from django.db import models
from .service_provider import ServiceProvider
from .service import Service

class Staff(models.Model):
    """Staff Model represents the staffs give services to customer."""
    uid = models.CharField(max_length=50, primary_key=True)
    name = models.CharField(max_length=100)
    service_provider = models.ForeignKey(ServiceProvider,
                                         on_delete=models.CASCADE)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    specialty = models.CharField(max_length=100)
    background = models.CharField(max_length=500)
    start_work_time = models.TimeField()
    get_off_work_time = models.TimeField()
    profile_picture = models.TextField(default=None)

    def __str__(self):
        return f"{self.service_provider}-{self.name}"
    