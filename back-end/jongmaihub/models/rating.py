from django.db import models
from .appointment import Appointment


class Rating(models.Model):
    """Rating Model represents the rating of the services, it shows the satisfaction of the customer."""
    appointment = models.OneToOneField(Appointment, on_delete=models.CASCADE,
                                       primary_key=True)
    rating = models.DecimalField(decimal_places=1, max_digits=2)
