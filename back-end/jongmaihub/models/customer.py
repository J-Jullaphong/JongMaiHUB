from django.db import models


class Customer(models.Model):
    """Customer Model represents the customers, containing basic information."""
    uid = models.CharField(max_length=50, primary_key=True)
    name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=10, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)

    def __str__(self):
        return f"{self.name}-{self.email}"
    