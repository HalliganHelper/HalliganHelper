# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Student'
        db.create_table(u'HalliganTAAvailability_student', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('usr', self.gf('django.db.models.fields.related.OneToOneField')(to=orm['auth.User'], unique=True)),
        ))
        db.send_create_signal(u'HalliganTAAvailability', ['Student'])

        # Adding model 'TA'
        db.create_table(u'HalliganTAAvailability_ta', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('usr', self.gf('django.db.models.fields.related.OneToOneField')(to=orm['auth.User'], unique=True)),
            ('officeHours', self.gf('django.db.models.fields.TextField')()),
        ))
        db.send_create_signal(u'HalliganTAAvailability', ['TA'])

        # Adding model 'Course'
        db.create_table(u'HalliganTAAvailability_course', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('Name', self.gf('django.db.models.fields.CharField')(max_length=100)),
            ('Number', self.gf('django.db.models.fields.IntegerField')()),
            ('Professor', self.gf('django.db.models.fields.CharField')(max_length=50)),
            ('tas', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['HalliganTAAvailability.TA'], null=True, blank=True)),
            ('students', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['HalliganTAAvailability.Student'], null=True, blank=True)),
        ))
        db.send_create_signal(u'HalliganTAAvailability', ['Course'])

        # Adding model 'Request'
        db.create_table(u'HalliganTAAvailability_request', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('course', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['HalliganTAAvailability.Course'])),
            ('student', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['HalliganTAAvailability.Student'])),
            ('question', self.gf('django.db.models.fields.CharField')(max_length=51)),
            ('whenAsked', self.gf('django.db.models.fields.DateTimeField')()),
            ('whereLocated', self.gf('django.db.models.fields.CharField')(max_length=50)),
            ('solved', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('whenSolved', self.gf('django.db.models.fields.DateTimeField')(null=True, blank=True)),
            ('timedOut', self.gf('django.db.models.fields.BooleanField')(default=False)),
        ))
        db.send_create_signal(u'HalliganTAAvailability', ['Request'])


    def backwards(self, orm):
        # Deleting model 'Student'
        db.delete_table(u'HalliganTAAvailability_student')

        # Deleting model 'TA'
        db.delete_table(u'HalliganTAAvailability_ta')

        # Deleting model 'Course'
        db.delete_table(u'HalliganTAAvailability_course')

        # Deleting model 'Request'
        db.delete_table(u'HalliganTAAvailability_request')


    models = {
        u'HalliganTAAvailability.course': {
            'Meta': {'object_name': 'Course'},
            'Name': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'Number': ('django.db.models.fields.IntegerField', [], {}),
            'Professor': ('django.db.models.fields.CharField', [], {'max_length': '50'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'students': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['HalliganTAAvailability.Student']", 'null': 'True', 'blank': 'True'}),
            'tas': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['HalliganTAAvailability.TA']", 'null': 'True', 'blank': 'True'})
        },
        u'HalliganTAAvailability.request': {
            'Meta': {'object_name': 'Request'},
            'course': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['HalliganTAAvailability.Course']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'question': ('django.db.models.fields.CharField', [], {'max_length': '51'}),
            'solved': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'student': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['HalliganTAAvailability.Student']"}),
            'timedOut': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'whenAsked': ('django.db.models.fields.DateTimeField', [], {}),
            'whenSolved': ('django.db.models.fields.DateTimeField', [], {'null': 'True', 'blank': 'True'}),
            'whereLocated': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        u'HalliganTAAvailability.student': {
            'Meta': {'object_name': 'Student'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'usr': ('django.db.models.fields.related.OneToOneField', [], {'to': u"orm['auth.User']", 'unique': 'True'})
        },
        u'HalliganTAAvailability.ta': {
            'Meta': {'object_name': 'TA'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'officeHours': ('django.db.models.fields.TextField', [], {}),
            'usr': ('django.db.models.fields.related.OneToOneField', [], {'to': u"orm['auth.User']", 'unique': 'True'})
        },
        u'auth.group': {
            'Meta': {'object_name': 'Group'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '80'}),
            'permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['auth.Permission']", 'symmetrical': 'False', 'blank': 'True'})
        },
        u'auth.permission': {
            'Meta': {'ordering': "(u'content_type__app_label', u'content_type__model', u'codename')", 'unique_together': "((u'content_type', u'codename'),)", 'object_name': 'Permission'},
            'codename': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'content_type': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['contenttypes.ContentType']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        u'auth.user': {
            'Meta': {'object_name': 'User'},
            'date_joined': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'email': ('django.db.models.fields.EmailField', [], {'max_length': '75', 'blank': 'True'}),
            'first_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'groups': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['auth.Group']", 'symmetrical': 'False', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_active': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'is_staff': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'is_superuser': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'last_login': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'last_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'password': ('django.db.models.fields.CharField', [], {'max_length': '128'}),
            'user_permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['auth.Permission']", 'symmetrical': 'False', 'blank': 'True'}),
            'username': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '30'})
        },
        u'contenttypes.contenttype': {
            'Meta': {'ordering': "('name',)", 'unique_together': "(('app_label', 'model'),)", 'object_name': 'ContentType', 'db_table': "'django_content_type'"},
            'app_label': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'model': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '100'})
        }
    }

    complete_apps = ['HalliganTAAvailability']