# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):

        # Changing field 'Computer.ComputerNumber'
        db.alter_column(u'HalliganComputerAvailability_computer', 'ComputerNumber', self.gf('django.db.models.fields.CharField')(max_length=7, primary_key=True))

    def backwards(self, orm):

        # Changing field 'Computer.ComputerNumber'
        db.alter_column(u'HalliganComputerAvailability_computer', 'ComputerNumber', self.gf('django.db.models.fields.CharField')(max_length=4, primary_key=True))

    models = {
        u'HalliganComputerAvailability.computer': {
            'ComputerNumber': ('django.db.models.fields.CharField', [], {'max_length': '7', 'primary_key': 'True'}),
            'Meta': {'object_name': 'Computer'},
            'RoomNumber': ('django.db.models.fields.IntegerField', [], {}),
            'Status': ('django.db.models.fields.CharField', [], {'default': "'AVAILABLE'", 'max_length': '9'})
        },
        u'HalliganComputerAvailability.lab': {
            'ClassName': ('django.db.models.fields.CharField', [], {'max_length': '10'}),
            'ClassSemester': ('django.db.models.fields.CharField', [], {'max_length': '20'}),
            'EndDate': ('django.db.models.fields.DateField', [], {}),
            'EndTime': ('django.db.models.fields.TimeField', [], {}),
            'LabLeader': ('django.db.models.fields.CharField', [], {'max_length': '200'}),
            'Meta': {'object_name': 'Lab'},
            'RoomNumber': ('django.db.models.fields.IntegerField', [], {}),
            'StartDate': ('django.db.models.fields.DateField', [], {}),
            'StartTime': ('django.db.models.fields.TimeField', [], {}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'})
        }
    }

    complete_apps = ['HalliganComputerAvailability']