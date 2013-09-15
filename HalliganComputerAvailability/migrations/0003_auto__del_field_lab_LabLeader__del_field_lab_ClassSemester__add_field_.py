# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Deleting field 'Lab.LabLeader'
        db.delete_column(u'HalliganComputerAvailability_lab', 'LabLeader')

        # Deleting field 'Lab.ClassSemester'
        db.delete_column(u'HalliganComputerAvailability_lab', 'ClassSemester')

        # Adding field 'Lab.DayOfWeek'
        db.add_column(u'HalliganComputerAvailability_lab', 'DayOfWeek',
                      self.gf('django.db.models.fields.IntegerField')(default=1, max_length=1),
                      keep_default=False)


    def backwards(self, orm):
        # Adding field 'Lab.LabLeader'
        db.add_column(u'HalliganComputerAvailability_lab', 'LabLeader',
                      self.gf('django.db.models.fields.CharField')(default='NOLEADER', max_length=200),
                      keep_default=False)

        # Adding field 'Lab.ClassSemester'
        db.add_column(u'HalliganComputerAvailability_lab', 'ClassSemester',
                      self.gf('django.db.models.fields.CharField')(default='NOSEMESTER', max_length=20),
                      keep_default=False)

        # Deleting field 'Lab.DayOfWeek'
        db.delete_column(u'HalliganComputerAvailability_lab', 'DayOfWeek')


    models = {
        u'HalliganComputerAvailability.computer': {
            'ComputerNumber': ('django.db.models.fields.CharField', [], {'max_length': '7', 'primary_key': 'True'}),
            'Meta': {'object_name': 'Computer'},
            'RoomNumber': ('django.db.models.fields.IntegerField', [], {}),
            'Status': ('django.db.models.fields.CharField', [], {'default': "'AVAILABLE'", 'max_length': '9'})
        },
        u'HalliganComputerAvailability.lab': {
            'ClassName': ('django.db.models.fields.CharField', [], {'max_length': '10'}),
            'DayOfWeek': ('django.db.models.fields.IntegerField', [], {'max_length': '1'}),
            'EndDate': ('django.db.models.fields.DateField', [], {}),
            'EndTime': ('django.db.models.fields.TimeField', [], {}),
            'Meta': {'object_name': 'Lab'},
            'RoomNumber': ('django.db.models.fields.IntegerField', [], {}),
            'StartDate': ('django.db.models.fields.DateField', [], {}),
            'StartTime': ('django.db.models.fields.TimeField', [], {}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'})
        }
    }

    complete_apps = ['HalliganComputerAvailability']