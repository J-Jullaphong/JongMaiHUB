from django.db import models
from .customer import Customer
from .service import Service
from .staff import Staff


class Appointment(models.Model):
    """Appointment Model represents the action which customers perform to make a service reservation."""
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE)
    date_time = models.DateTimeField()
    