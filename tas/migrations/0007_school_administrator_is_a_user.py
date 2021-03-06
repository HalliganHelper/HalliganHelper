# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2015-12-20 02:03
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tas', '0006_set_defaults_on_fields'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='school',
            name='administrator_email',
        ),
        migrations.AddField(
            model_name='school',
            name='administrator',
            field=models.OneToOneField(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='course',
            name='school',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='courses', to='tas.School'),
        ),
        migrations.AlterField(
            model_name='student',
            name='courses',
            field=models.ManyToManyField(blank=True, help_text=b'The courses a student is registered for.', related_name='students', to='tas.Course'),
        ),
    ]
