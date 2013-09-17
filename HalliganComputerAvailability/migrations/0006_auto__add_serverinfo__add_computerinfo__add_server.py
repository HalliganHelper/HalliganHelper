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
            ('ComputerName', self.gf('django.db.models.fields.CharField')(max_length=20)),
            ('Updated', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, blank=True)),
            ('NumUsers', self.gf('django.db.models.fields.IntegerField')()),
        ))
        db.send_create_signal(u'HalliganComputerAvailability', ['ServerInfo'])

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
        ))
        db.send_create_signal(u'HalliganComputerAvailability', ['Server'])


    def backwards(self, orm):
        # Deleting model 'ServerInfo'
        db.delete_table(u'HalliganComputerAvailability_serverinfo')

        # Deleting model 'ComputerInfo'
        db.delete_table(u'HalliganComputerAvailability_computerinfo')

        # Deleting model 'Server'
        db.delete_table(u'HalliganComputerAvailability_server')


    models = {
        u'HalliganComputerAvailability.computer': {
            'ComputerNumber': ('django.db.models.fields.CharField', [], {'max_length': '7', 'primary_key': 'True'}),
            'LastUpdate': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            'Meta': {'object_name': 'Computer'},
            'RoomNumber': ('django.db.models.fields.IntegerField', [], {}),
            'Status': ('django.db.models.fields.CharField', [], {'default': "'AVAILABLE'", 'max_length': '9'})
        },
        u'HalliganComputerAvailability.computerinfo': {
            'ComputerNumber': ('django.db.models.fields.CharField', [], {'max_length': '7'}),
            'ComputerStatus': ('django.db.models.fields.CharField', [], {'default': "'AVAILABLE'", 'max_length': '10'}),
            'Meta': {'object_name': 'ComputerInfo'},
            'RoomNumber': ('django.db.models.fields.IntegerField', [], {}),
            'Updated': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'})
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
        u'HalliganComputerAvailability.server': {
            'ComputerName': ('django.db.models.fields.CharField', [], {'max_length': '20', 'primary_key': 'True'}),
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