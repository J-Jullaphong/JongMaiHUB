# Generated by Django 4.2.6 on 2023-10-18 15:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Appointment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_time', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('uid', models.CharField(max_length=28, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('phone_number', models.CharField(max_length=10)),
                ('email', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Service',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('type', models.CharField(max_length=100)),
                ('duration', models.DurationField()),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
            ],
        ),
        migrations.CreateModel(
            name='ServiceProvider',
            fields=[
                ('uid', models.CharField(max_length=28, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('location', models.CharField(max_length=500)),
                ('opening_time', models.TimeField()),
                ('closing_time', models.TimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Rating',
            fields=[
                ('appointment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='jongmaihub.appointment')),
                ('rating', models.DecimalField(decimal_places=1, max_digits=2)),
            ],
        ),
        migrations.CreateModel(
            name='Staff',
            fields=[
                ('uid', models.CharField(max_length=28, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('specialty', models.CharField(max_length=100)),
                ('background', models.CharField(max_length=500)),
                ('start_work_time', models.TimeField()),
                ('get_off_work_time', models.TimeField()),
                ('service', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='jongmaihub.service')),
                ('service_provider', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='jongmaihub.serviceprovider')),
            ],
        ),
        migrations.AddField(
            model_name='service',
            name='service_provider',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='jongmaihub.serviceprovider'),
        ),
        migrations.AddField(
            model_name='appointment',
            name='customer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='jongmaihub.customer'),
        ),
        migrations.AddField(
            model_name='appointment',
            name='service',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='jongmaihub.service'),
        ),
        migrations.AddField(
            model_name='appointment',
            name='staff',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='jongmaihub.staff'),
        ),
    ]
