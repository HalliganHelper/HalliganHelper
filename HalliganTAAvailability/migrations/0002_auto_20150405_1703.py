# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('HalliganTAAvailability', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='course',
            name='Professor',
        ),
        migrations.AddField(
            model_name='course',
            name='department',
            field=models.CharField(default='Comp', help_text=b'The department the course belongs to', max_length=50),
            preserve_default=False,
        ),
    ]
