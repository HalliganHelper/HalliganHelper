# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Computer'
        db.create_table(u'HalliganComputerAvailability_computer', (
            ('ComputerNumber', self.gf('django.db.models.fields.CharField')(max_length=7, primary_key=True)),
            ('RoomNumber', self.gf('django.db.models.fields.IntegerField')()),
            ('Status', self.gf('django.db.models.fields.CharField')(default='AVAILABLE', max_length=9)),
            ('used_for', self.gf('django.db.models.fields.CharField')(max_length=40, null=True)),
            ('LastUpdate', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, blank=True)),
        ))
        db.send_create_signal(u'HalliganComputerAvailability', ['Computer'])

        # Adding model 'RoomInfo'
        db.create_table(u'HalliganComputerAvailability_roominfo', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('lab', self.gf('django.db.models.fields.CharField')(max_length=10)),
            ('numReporting', self.gf('django.db.models.fields.IntegerField')()),
            ('num_available', self.gf('django.db.models.fields.IntegerField')()),
            ('num_unavailable', self.gf('django.db.models.fields.IntegerField')()),
            ('num_error', self.gf('django.db.models.fields.IntegerField')()),
            ('updateTime', self.gf('django.db.models.fields.DateTimeField')()),
        ))
        db.send_create_signal(u'HalliganComputerAvailability', ['RoomInfo'])

        # Adding model 'CourseUsageInfo'
        db.create_table(u'HalliganComputerAvailability_courseusageinfo', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('room', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['HalliganComputerAvailability.RoomInfo'])),
            ('course', self.gf('django.db.models.fields.CharField')(max_length=20)),
            ('num_machines', self.gf('django.db.models.fields.IntegerField')()),
        ))
        db.send_create_signal(u'HalliganComputerAvailability', ['CourseUsageInfo'])

        # Adding model 'ComputerInfo'
        db.create_table(u'HalliganComputerAvailability_computerinfo', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('RoomNumber', self.gf('django.db.models.fields.IntegerField')()),
            ('ComputerNumber', self.gf('django.db.models.fields.CharField')(max_length=7)),
            ('Updated', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, blank=True)),
            ('ComputerStatus', self.gf('django.db.models.fields.CharField')(default='AVAILABLE', max_length=10)),
        ))
        db.send_create_signal(u'HalliganComputerAvailability', ['ComputerInfo'])

        # Adding model 'Server'
        db.create_table(u'HalliganComputerAvailability_server', (
            ('ComputerName', self.gf('django.db.models.fields.CharField')(max_length=20, primary_key=True)),
            ('NumUsers', self.gf('django.db.models.fields.IntegerField')()),
            ('Status', self.gf('django.db.models.fields.CharField')(default='ON', max_length=40)),
            ('LastUpdated', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, blank=True)),
        ))
        db.send_create_signal(u'HalliganComputerAvailability', ['Server'])

        # Adding model 'ServerInfo'
        db.create_table(u'HalliganComputerAvailability_serverinfo', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('ComputerName', self.gf('django.db.models.fields.CharField')(max_length=20)),
            ('Updated', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, blank=True)),
            ('NumUsers', self.gf('django.db.models.fields.IntegerField')()),
        ))
        db.send_create_signal(u'HalliganComputerAvailability', ['ServerInfo'])

        # Adding model 'Lab'
        db.create_table(u'HalliganComputerAvailability_lab', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('ClassName', self.gf('django.db.models.fields.CharField')(max_length=30)),
            ('RoomNumber', self.gf('django.db.models.fields.IntegerField')()),
            ('StartTime', self.gf('django.db.models.fields.TimeField')()),
            ('EndTime', self.gf('django.db.models.fields.TimeField')()),
            ('StartDate', self.gf('django.db.models.fields.DateField')()),
            ('EndDate', self.gf('django.db.models.fields.DateField')()),
            ('DayOfWeek', self.gf('django.db.models.fields.IntegerField')(max_length=1)),
        ))
        db.send_create_signal(u'HalliganComputerAvailability', ['Lab'])


    def backwards(self, orm):
        # Deleting model 'Computer'
        db.delete_table(u'HalliganComputerAvailability_computer')

        # Deleting model 'RoomInfo'
        db.delete_table(u'HalliganComputerAvailability_roominfo')

        # Deleting model 'CourseUsageInfo'
        db.delete_table(u'HalliganComputerAvailability_courseusageinfo')

        # Deleting model 'ComputerInfo'
        db.delete_table(u'HalliganComputerAvailability_computerinfo')

        # Deleting model 'Server'
        db.delete_table(u'HalliganComputerAvailability_server')

        # Deleting model 'ServerInfo'
        db.delete_table(u'HalliganComputerAvailability_serverinfo')

        # Deleting model 'Lab'
        db.delete_table(u'HalliganComputerAvailability_lab')


    models = {
        u'HalliganComputerAvailability.computer': {
            'ComputerNumber': ('django.db.models.fields.CharField', [], {'max_length': '7', 'primary_key': 'True'}),
            'LastUpdate': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            'Meta': {'object_name': 'Computer'},
            'RoomNumber': ('django.db.models.fields.IntegerField', [], {}),
            'Status': ('django.db.models.fields.CharField', [], {'default': "'AVAILABLE'", 'max_length': '9'}),
            'used_for': ('django.db.models.fields.CharField', [], {'max_length': '40', 'null': 'True'})
        },
        u'HalliganComputerAvailability.computerinfo': {
            'ComputerNumber': ('django.db.models.fields.CharField', [], {'max_length': '7'}),
            'ComputerStatus': ('django.db.models.fields.CharField', [], {'default': "'AVAILABLE'", 'max_length': '10'}),
            'Meta': {'object_name': 'ComputerInfo'},
            'RoomNumber': ('django.db.models.fields.IntegerField', [], {}),
            'Updated': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'})
        },
        u'HalliganComputerAvailability.courseusageinfo': {
            'Meta': {'object_name': 'CourseUsageInfo'},
            'course': ('django.db.models.fields.CharField', [], {'max_length': '20'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'num_machines': ('django.db.models.fields.IntegerField', [], {}),
            'room': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['HalliganComputerAvailability.RoomInfo']"})
        },
        u'HalliganComputerAvailability.lab': {
            'ClassName': ('django.db.models.fields.CharField', [], {'max_length': '30'}),
            'DayOfWeek': ('django.db.models.fields.IntegerField', [], {'max_length': '1'}),
            'EndDate': ('django.db.models.fields.DateField', [], {}),
            'EndTime': ('django.db.models.fields.TimeField', [], {}),
            'Meta': {'object_name': 'Lab'},
            'RoomNumber': ('django.db.models.fields.IntegerField', [], {}),
            'StartDate': ('django.db.models.fields.DateField', [], {}),
            'StartTime': ('django.db.models.fields.TimeField', [], {}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'})
        },
        u'HalliganComputerAvailability.roominfo': {
            'Meta': {'object_name': 'RoomInfo'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'lab': ('django.db.models.fields.CharField', [], {'max_length': '10'}),
            'numReporting': ('django.db.models.fields.IntegerField', [], {}),
            'num_available': ('django.db.models.fields.IntegerField', [], {}),
            'num_error': ('django.db.models.fields.IntegerField', [], {}),
            'num_unavailable': ('django.db.models.fields.IntegerField', [], {}),
            'updateTime': ('django.db.models.fields.DateTimeField', [], {})
        },
        u'HalliganComputerAvailability.server': {
            'ComputerName': ('django.db.models.fields.CharField', [], {'max_length': '20', 'primary_key': 'True'}),
            'LastUpdated': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            'Meta': {'object_name': 'Server'},
            'NumUsers': ('django.db.models.fields.IntegerField', [], {}),
            'Status': ('django.db.models.fields.CharField', [], {'default': "'ON'", 'max_length': '40'})
        },
        u'HalliganComputerAvailability.serverinfo': {
            'ComputerName': ('django.db.models.fields.CharField', [], {'max_length': '20'}),
            'Meta': {'object_name': 'ServerInfo'},
            'NumUsers': ('django.db.models.fields.IntegerField', [], {}),
            'Updated': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'})
        }
    }

    complete_apps = ['HalliganComputerAvailability']