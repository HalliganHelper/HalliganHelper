# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Deleting field 'OfficeHours.dayOfWeek'
        db.delete_column(u'HalliganTAAvailability_officehours', 'dayOfWeek')

        # Deleting field 'OfficeHours.startTime'
        db.delete_column(u'HalliganTAAvailability_officehours', 'startTime')

        # Deleting field 'OfficeHours.endTime'
        db.delete_column(u'HalliganTAAvailability_officehours', 'endTime')

        # Adding field 'OfficeHours.start_time'
        db.add_column(u'HalliganTAAvailability_officehours', 'start_time',
                      self.gf('django.db.models.fields.DateTimeField')(default=datetime.datetime(2014, 4, 7, 0, 0)),
                      keep_default=False)

        # Adding field 'OfficeHours.end_time'
        db.add_column(u'HalliganTAAvailability_officehours', 'end_time',
                      self.gf('django.db.models.fields.DateTimeField')(default=datetime.datetime(2014, 4, 7, 0, 0)),
                      keep_default=False)

        # Adding field 'OfficeHours.course'
        db.add_column(u'HalliganTAAvailability_officehours', 'course',
                      self.gf('django.db.models.fields.related.ForeignKey')(default=1, to=orm['HalliganTAAvailability.Course']),
                      keep_default=False)

        # Adding field 'OfficeHours.ta'
        db.add_column(u'HalliganTAAvailability_officehours', 'ta',
                      self.gf('django.db.models.fields.related.ForeignKey')(default=1, to=orm['HalliganTAAvailability.TA']),
                      keep_default=False)

        # Removing M2M table for field ta on 'OfficeHours'
        db.delete_table(db.shorten_name(u'HalliganTAAvailability_officehours_ta'))


    def backwards(self, orm):
        # Adding field 'OfficeHours.dayOfWeek'
        db.add_column(u'HalliganTAAvailability_officehours', 'dayOfWeek',
                      self.gf('django.db.models.fields.PositiveSmallIntegerField')(default=0),
                      keep_default=False)

        # Adding field 'OfficeHours.startTime'
        db.add_column(u'HalliganTAAvailability_officehours', 'startTime',
                      self.gf('django.db.models.fields.TimeField')(default=datetime.datetime(2014, 4, 7, 0, 0)),
                      keep_default=False)

        # Adding field 'OfficeHours.endTime'
        db.add_column(u'HalliganTAAvailability_officehours', 'endTime',
                      self.gf('django.db.models.fields.TimeField')(default=datetime.datetime(2014, 4, 7, 0, 0)),
                      keep_default=False)

        # Deleting field 'OfficeHours.start_time'
        db.delete_column(u'HalliganTAAvailability_officehours', 'start_time')

        # Deleting field 'OfficeHours.end_time'
        db.delete_column(u'HalliganTAAvailability_officehours', 'end_time')

        # Deleting field 'OfficeHours.course'
        db.delete_column(u'HalliganTAAvailability_officehours', 'course_id')

        # Deleting field 'OfficeHours.ta'
        db.delete_column(u'HalliganTAAvailability_officehours', 'ta_id')

        # Adding M2M table for field ta on 'OfficeHours'
        m2m_table_name = db.shorten_name(u'HalliganTAAvailability_officehours_ta')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('officehours', models.ForeignKey(orm[u'HalliganTAAvailability.officehours'], null=False)),
            ('ta', models.ForeignKey(orm[u'HalliganTAAvailability.ta'], null=False))
        ))
        db.create_unique(m2m_table_name, ['officehours_id', 'ta_id'])


    models = {
        u'HalliganTAAvailability.course': {
            'Meta': {'object_name': 'Course'},
            'Name': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'Number': ('django.db.models.fields.IntegerField', [], {}),
            'Professor': ('django.db.models.fields.CharField', [], {'max_length': '50'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'students': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['HalliganTAAvailability.Student']", 'null': 'True', 'blank': 'True'})
        },
        u'HalliganTAAvailability.officehours': {
            'Meta': {'object_name': 'OfficeHours'},
            'course': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['HalliganTAAvailability.Course']"}),
            'end_time': ('django.db.models.fields.DateTimeField', [], {}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'start_time': ('django.db.models.fields.DateTimeField', [], {}),
            'ta': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['HalliganTAAvailability.TA']"})
        },
        u'HalliganTAAvailability.request': {
            'Meta': {'object_name': 'Request'},
            'course': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['HalliganTAAvailability.Course']"}),
            'emailed': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
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
            'active': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'course': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['HalliganTAAvailability.Course']", 'symmetrical': 'False'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
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