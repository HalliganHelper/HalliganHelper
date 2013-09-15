# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Course'
        db.create_table(u'HalliganTAAvailability_course', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('Name', self.gf('django.db.models.fields.CharField')(max_length=10)),
            ('Number', self.gf('django.db.models.fields.CharField')(max_length=20)),
            ('Professor', self.gf('django.db.models.fields.CharField')(max_length=50)),
        ))
        db.send_create_signal(u'HalliganTAAvailability', ['Course'])

        # Adding model 'Profile'
        db.create_table(u'HalliganTAAvailability_profile', (
            ('NeedsHelp', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('BaseUser', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['auth.User'], primary_key=True)),
            ('NeedHelpWith', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['HalliganTAAvailability.Course'])),
        ))
        db.send_create_signal(u'HalliganTAAvailability', ['Profile'])

        # Adding model 'TA'
        db.create_table(u'HalliganTAAvailability_ta', (
            ('Date', self.gf('django.db.models.fields.DateField')(auto_now=True, blank=True)),
            ('StartTime', self.gf('django.db.models.fields.TimeField')(auto_now=True, blank=True)),
            ('EndTime', self.gf('django.db.models.fields.TimeField')(auto_now=True, blank=True)),
            ('HomeBaseRoom', self.gf('django.db.models.fields.CharField')(max_length=30)),
            ('Data', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['HalliganTAAvailability.Profile'], primary_key=True)),
        ))
        db.send_create_signal(u'HalliganTAAvailability', ['TA'])

        # Adding M2M table for field Classes on 'TA'
        m2m_table_name = db.shorten_name(u'HalliganTAAvailability_ta_Classes')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('ta', models.ForeignKey(orm[u'HalliganTAAvailability.ta'], null=False)),
            ('course', models.ForeignKey(orm[u'HalliganTAAvailability.course'], null=False))
        ))
        db.create_unique(m2m_table_name, ['ta_id', 'course_id'])

        # Adding M2M table for field CurrentClass on 'TA'
        m2m_table_name = db.shorten_name(u'HalliganTAAvailability_ta_CurrentClass')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('ta', models.ForeignKey(orm[u'HalliganTAAvailability.ta'], null=False)),
            ('course', models.ForeignKey(orm[u'HalliganTAAvailability.course'], null=False))
        ))
        db.create_unique(m2m_table_name, ['ta_id', 'course_id'])


    def backwards(self, orm):
        # Deleting model 'Course'
        db.delete_table(u'HalliganTAAvailability_course')

        # Deleting model 'Profile'
        db.delete_table(u'HalliganTAAvailability_profile')

        # Deleting model 'TA'
        db.delete_table(u'HalliganTAAvailability_ta')

        # Removing M2M table for field Classes on 'TA'
        db.delete_table(db.shorten_name(u'HalliganTAAvailability_ta_Classes'))

        # Removing M2M table for field CurrentClass on 'TA'
        db.delete_table(db.shorten_name(u'HalliganTAAvailability_ta_CurrentClass'))


    models = {
        u'HalliganTAAvailability.course': {
            'Meta': {'object_name': 'Course'},
            'Name': ('django.db.models.fields.CharField', [], {'max_length': '10'}),
            'Number': ('django.db.models.fields.CharField', [], {'max_length': '20'}),
            'Professor': ('django.db.models.fields.CharField', [], {'max_length': '50'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'})
        },
        u'HalliganTAAvailability.profile': {
            'BaseUser': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['auth.User']", 'primary_key': 'True'}),
            'Meta': {'object_name': 'Profile'},
            'NeedHelpWith': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['HalliganTAAvailability.Course']"}),
            'NeedsHelp': ('django.db.models.fields.BooleanField', [], {'default': 'False'})
        },
        u'HalliganTAAvailability.ta': {
            'Classes': ('django.db.models.fields.related.ManyToManyField', [], {'related_name': "'AllClasses'", 'symmetrical': 'False', 'to': u"orm['HalliganTAAvailability.Course']"}),
            'CurrentClass': ('django.db.models.fields.related.ManyToManyField', [], {'related_name': "'CurrentClass'", 'symmetrical': 'False', 'to': u"orm['HalliganTAAvailability.Course']"}),
            'Data': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['HalliganTAAvailability.Profile']", 'primary_key': 'True'}),
            'Date': ('django.db.models.fields.DateField', [], {'auto_now': 'True', 'blank': 'True'}),
            'EndTime': ('django.db.models.fields.TimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            'HomeBaseRoom': ('django.db.models.fields.CharField', [], {'max_length': '30'}),
            'Meta': {'object_name': 'TA'},
            'StartTime': ('django.db.models.fields.TimeField', [], {'auto_now': 'True', 'blank': 'True'})
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