# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2015-12-29 18:33
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tas', '0007_school_administrator_is_a_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='request',
            name='expired',
            field=models.BooleanField(default=False, help_text=b'If the request expired'),
        ),
        migrations.AddField(
            model_name='request',
            name='expired_at',
            field=models.DateTimeField(blank=True, help_text=b'When the request was marked as expired', null=True),
        ),
        migrations.AlterField(
            model_name='course',
            name='postfix',
            field=models.CharField(blank=True, default=b'', help_text=b'The CP of COMP 150CP', max_length=20),
        ),
        migrations.AlterField(
            model_name='schoolemaildomain',
            name='school',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='valid_domains', to='tas.School'),
        ),
    ]
