# Generated by Django 4.2.4 on 2023-10-23 07:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jongmaihub', '0003_service_service_picture_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='email',
            field=models.EmailField(max_length=254),
        ),
    ]