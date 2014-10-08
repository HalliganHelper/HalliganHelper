# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'ServerInfo'
        db.create_table(u'HalliganComputerAvailability_serverinfo', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=20)),
            ('last_updated', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, blank=True)),
            ('num_users', self.gf('django.db.models.fields.IntegerField')()),
        ))
        db.send_create_signal(u'HalliganComputerAvailability', ['ServerInfo'])


        # Changing field 'Computer.used_for'
        db.alter_column(u'HalliganComputerAvailability_computer', 'used_for', self.gf('django.db.models.fields.CharField')(default='', max_length=40))

    def backwards(self, orm):
        # Deleting model 'ServerInfo'
        db.delete_table(u'HalliganComputerAvailability_serverinfo')


        # Changing field 'Computer.used_for'
        db.alter_column(u'HalliganComputerAvailability_computer', 'used_for', self.gf('django.db.models.fields.CharField')(max_length=40, null=True))

    models = {
        u'HalliganComputerAvailability.computer': {
            'Meta': {'object_name': 'Computer'},
            'last_update': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            'number': ('django.db.models.fields.CharField', [], {'max_length': '7', 'primary_key': 'True'}),
            'room_number': ('django.db.models.fields.IntegerField', [], {}),
            'status': ('django.db.models.fields.CharField', [], {'default': "'AVAILABLE'", 'max_length': '9'}),
            'used_for': ('django.db.models.fields.CharField', [], {'max_length': '40', 'blank': 'True'})
        },
        u'HalliganComputerAvailability.courseusageinfo': {
            'Meta': {'object_name': 'CourseUsageInfo'},
            'course': ('django.db.models.fields.CharField', [], {'max_length': '20'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'num_machines': ('django.db.models.fields.IntegerField', [], {}),
            'room': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'cuis'", 'to': u"orm['HalliganComputerAvailability.RoomInfo']"})
        },
        u'HalliganComputerAvailability.lab': {
            'Meta': {'object_name': 'Lab'},
            'course_name': ('django.db.models.fields.CharField', [], {'max_length': '30'}),
            'day_of_week': ('django.db.models.fields.IntegerField', [], {'max_length': '1'}),
            'end_date': ('django.db.models.fields.DateField', [], {}),
            'end_time': ('django.db.models.fields.TimeField', [], {}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'room_number': ('django.db.models.fields.IntegerField', [], {}),
            'start_date': ('django.db.models.fields.DateField', [], {}),
            'start_time': ('django.db.models.fields.TimeField', [], {})
        },
        u'HalliganComputerAvailability.roominfo': {
            'Meta': {'object_name': 'RoomInfo'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'lab': ('django.db.models.fields.CharField', [], {'max_length': '10'}),
            'last_updated': ('django.db.models.fields.DateTimeField', [], {}),
            'num_available': ('django.db.models.fields.IntegerField', [], {}),
            'num_error': ('django.db.models.fields.IntegerField', [], {}),
            'num_reporting': ('django.db.models.fields.IntegerField', [], {}),
            'num_unavailable': ('django.db.models.fields.IntegerField', [], {})
        },
        u'HalliganComputerAvailability.server': {
            'Meta': {'object_name': 'Server'},
            'last_updated': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '20', 'primary_key': 'True'}),
            'num_users': ('django.db.models.fields.IntegerField', [], {}),
            'status': ('django.db.models.fields.CharField', [], {'default': "'ON'", 'max_length': '40'})
        },
        u'HalliganComputerAvailability.serverinfo': {
            'Meta': {'object_name': 'ServerInfo'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'last_updated': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '20'}),
            'num_users': ('django.db.models.fields.IntegerField', [], {})
        }
    }

    complete_apps = ['HalliganComputerAvailability']