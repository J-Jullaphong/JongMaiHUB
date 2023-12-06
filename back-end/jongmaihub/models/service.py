from django.db import models
from .service_provider import ServiceProvider


class Service(models.Model):
    """Service Model represents the service for reservations."""
    name = models.CharField(max_length=100)
    service_provider = models.ForeignKey(ServiceProvider,
                                         on_delete=models.CASCADE)
    type = models.CharField(max_length=100)
    duration = models.IntegerField()
    price = models.DecimalField(decimal_places=2, max_digits=10)
    service_picture = models.TextField(default=None)

    def __str__(self):
        return f"{self.service_provider}-{self.name}"
    