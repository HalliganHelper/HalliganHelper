# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Deleting model 'ServerInfo'
        db.delete_table(u'HalliganComputerAvailability_serverinfo')

        # Deleting model 'ComputerInfo'
        db.delete_table(u'HalliganComputerAvailability_computerinfo')

        # Deleting field 'Lab.ClassName'
        db.rename_column(u'HalliganComputerAvailability_lab', 'ClassName',
                         'course_name')

        # Deleting field 'Lab.DayOfWeek'
        db.rename_column(u'HalliganComputerAvailability_lab', 'DayOfWeek',
                         'day_of_week')

        # Deleting field 'Lab.EndDate'
        db.rename_column(u'HalliganComputerAvailability_lab', 'EndDate',
                         'end_date')

        # Deleting field 'Lab.StartTime'
        db.rename_column(u'HalliganComputerAvailability_lab', 'StartTime',
                         'start_time')

        # Deleting field 'Lab.StartDate'
        db.rename_column(u'HalliganComputerAvailability_lab', 'StartDate',
                         'start_date')

        # Deleting field 'Lab.EndTime'
        db.rename_column(u'HalliganComputerAvailability_lab', 'EndTime',
                         'end_time')

        # Deleting field 'Lab.RoomNumber'
        db.rename_column(u'HalliganComputerAvailability_lab', 'RoomNumber',
                         'room_number')

        # Deleting field 'RoomInfo.updateTime'
        db.rename_column(u'HalliganComputerAvailability_roominfo',
                         'updateTime', 'update_time')

        # Deleting field 'RoomInfo.numReporting'
        db.rename_column(u'HalliganComputerAvailability_roominfo',
                         'numReporting', 'num_reporting')

        # Deleting field 'Computer.Status'
        db.rename_column(u'HalliganComputerAvailability_computer', 'Status',
                         'status')

        # Deleting field 'Computer.LastUpdate'
        db.rename_column(u'HalliganComputerAvailability_computer', 'LastUpdate',
                         'last_update')

        # Deleting field 'Computer.ComputerNumber'
        db.rename_column(u'HalliganComputerAvailability_computer', 'ComputerNumber',
                         'number')

        # Deleting field 'Computer.RoomNumber'
        db.rename_column(u'HalliganComputerAvailability_computer', 'RoomNumber',
                         'room_number')

        # Deleting field 'Server.NumUsers'
        db.rename_column(u'HalliganComputerAvailability_server', 'NumUsers',
                         'num_users')

        # Deleting field 'Server.Status'
        db.rename_column(u'HalliganComputerAvailability_server', 'Status',
                         'status')

        # Deleting field 'Server.ComputerName'
        db.rename_column(u'HalliganComputerAvailability_server', 'ComputerName',
                         'name')

        # Deleting field 'Server.LastUpdated'
        db.rename_column(u'HalliganComputerAvailability_server', 'LastUpdated',
                         'last_updated')

    def backwards(self, orm):
        # Adding model 'ServerInfo'
        db.create_table(u'HalliganComputerAvailability_serverinfo', (
            ('NumUsers', self.gf('django.db.models.fields.IntegerField')()),
            ('ComputerName', self.gf('django.db.models.fields.CharField')(max_length=20)),
            ('Updated', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, blank=True)),
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
        ))
        db.send_create_signal(u'HalliganComputerAvailability', ['ServerInfo'])

        # Adding model 'ComputerInfo'
        db.create_table(u'HalliganComputerAvailability_computerinfo', (
            ('Updated', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, blank=True)),
            ('ComputerNumber', self.gf('django.db.models.fields.CharField')(max_length=7)),
            ('RoomNumber', self.gf('django.db.models.fields.IntegerField')()),
            ('ComputerStatus', self.gf('django.db.models.fields.CharField')(default='AVAILABLE', max_length=10)),
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
        ))
        db.send_create_signal(u'HalliganComputerAvailability', ['ComputerInfo'])

        # Deleting field 'Lab.ClassName'
        db.rename_column(u'HalliganComputerAvailability_lab',
                         'course_name', 'ClassName')

        # Deleting field 'Lab.DayOfWeek'
        db.rename_column(u'HalliganComputerAvailability_lab',
                         'day_of_week', 'DayOfWeek')

        # Deleting field 'Lab.EndDate'
        db.rename_column(u'HalliganComputerAvailability_lab',
                         'end_date', 'EndDate')

        # Deleting field 'Lab.StartTime'
        db.rename_column(u'HalliganComputerAvailability_lab',
                         'start_time', 'StartTime')

        # Deleting field 'Lab.StartDate'
        db.rename_column(u'HalliganComputerAvailability_lab',
                         'start_date', 'StartDate')

        # Deleting field 'Lab.EndTime'
        db.rename_column(u'HalliganComputerAvailability_lab',
                         'end_time', 'EndTime')

        # Deleting field 'Lab.RoomNumber'
        db.rename_column(u'HalliganComputerAvailability_lab',
                         'room_number', 'RoomNumber')

        # Deleting field 'RoomInfo.updateTime'
        db.rename_column(u'HalliganComputerAvailability_roominfo',
                         'update_time', 'updateTime')

        # Deleting field 'RoomInfo.numReporting'
        db.rename_column(u'HalliganComputerAvailability_roominfo',
                         'num_reporting', 'numReporting')

        # Deleting field 'Computer.Status'
        db.rename_column(u'HalliganComputerAvailability_computer',
                         'status', 'Status')

        # Deleting field 'Computer.LastUpdate'
        db.rename_column(u'HalliganComputerAvailability_computer',
                         'last_update', 'LastUpdate')

        # Deleting field 'Computer.ComputerNumber'
        db.rename_column(u'HalliganComputerAvailability_computer',
                         'number', 'ComputerNumber')

        # Deleting field 'Computer.RoomNumber'
        db.rename_column(u'HalliganComputerAvailability_computer',
                         'room_number', 'RoomNumber')

        # Deleting field 'Server.NumUsers'
        db.rename_column(u'HalliganComputerAvailability_server',
                         'num_users', 'NumUsers')

        # Deleting field 'Server.Status'
        db.rename_column(u'HalliganComputerAvailability_server',
                         'status', 'Status')

        # Deleting field 'Server.ComputerName'
        db.rename_column(u'HalliganComputerAvailability_server',
                         'name', 'ComputerName')

        # Deleting field 'Server.LastUpdated'
        db.rename_column(u'HalliganComputerAvailability_server',
                         'last_updated', 'LastUpdated')


    models = {
        u'HalliganComputerAvailability.computer': {
            'Meta': {'object_name': 'Computer'},
            'last_update': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            'number': ('django.db.models.fields.CharField', [], {'max_length': '7', 'primary_key': 'True'}),
            'room_number': ('django.db.models.fields.IntegerField', [], {}),
            'status': ('django.db.models.fields.CharField', [], {'default': "'AVAILABLE'", 'max_length': '9'}),
            'used_for': ('django.db.models.fields.CharField', [], {'max_length': '40', 'null': 'True'})
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
        }
    }

    complete_apps = ['HalliganComputerAvailability']
