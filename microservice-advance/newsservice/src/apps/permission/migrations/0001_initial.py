# Generated by Django 2.0.5 on 2019-10-26 08:51

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='PermissionModel',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('func_name', models.CharField(max_length=255, unique=True)),
                ('description', models.TextField(blank=True)),
                ('time_created', models.BigIntegerField(blank=True, default=1572079903, editable=False)),
                ('time_modified', models.BigIntegerField(blank=True, default=1572079903, editable=False)),
                ('created_by', models.TextField(blank=True, editable=False, null=True)),
                ('modified_by', models.TextField(blank=True, editable=False, null=True)),
            ],
            options={
                'db_table': 'permission',
            },
        ),
    ]
