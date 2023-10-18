from django.db import models


class ServiceProvider(models.Model):
    """Service Provider Model represents a service provider with their information."""
    uid = models.CharField(max_length=28, primary_key=True)
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=500)
    opening_time = models.TimeField()
    closing_time = models.TimeField()


class Service(models.Model):
    """Service Model represents the service for reservations."""
    name = models.CharField(max_length=100)
    service_provider = models.ForeignKey(ServiceProvider,
                                         on_delete=models.CASCADE)
    type = models.CharField(max_length=100)
    duration = models.DurationField()
    price = models.DecimalField(decimal_places=2, max_digits=10)


class Staff(models.Model):
    """Staff Model represents the staffs give services to customer."""
    uid = models.CharField(max_length=28, primary_key=True)
    name = models.CharField(max_length=100)
    service_provider = models.ForeignKey(ServiceProvider,
                                         on_delete=models.CASCADE)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    specialty = models.CharField(max_length=100)
    background = models.CharField(max_length=500)
    start_work_time = models.TimeField()
    get_off_work_time = models.TimeField()
