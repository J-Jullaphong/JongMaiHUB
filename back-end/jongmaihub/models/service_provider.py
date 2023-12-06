from django.db import models


class ServiceProvider(models.Model):
    """Service Provider Model represents a service provider with their information."""
    uid = models.CharField(max_length=50, primary_key=True)
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=500)
    opening_time = models.TimeField()
    closing_time = models.TimeField()
    profile_picture = models.TextField(default=None)
    cover_picture = models.TextField(default=None)

    def __str__(self):
        return f"{self.name}-{self.uid}"
    