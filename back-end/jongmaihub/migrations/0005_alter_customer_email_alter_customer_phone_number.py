# Generated by Django 4.2.4 on 2023-10-23 07:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jongmaihub', '0004_alter_customer_email'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='email',
            field=models.EmailField(blank=True, max_length=254, null=True),
        ),
        migrations.AlterField(
            model_name='customer',
            name='phone_number',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
    ]