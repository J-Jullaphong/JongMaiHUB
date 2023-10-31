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


class Customer(models.Model):
    """Customer Model represents the customers, containing basic information."""
    uid = models.CharField(max_length=50, primary_key=True)
    name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=10, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)

    def __str__(self):
        return f"{self.name}-{self.email}"


class Appointment(models.Model):
    """Appointment Model represents the action which customers perform to make a service reservation."""
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE)
    date_time = models.DateTimeField()


class Rating(models.Model):
    """Rating Model represents the rating of the services, it shows the satisfaction of the customer."""
    appointment = models.OneToOneField(Appointment, on_delete=models.CASCADE,
                                       primary_key=True)
    rating = models.DecimalField(decimal_places=1, max_digits=2)
