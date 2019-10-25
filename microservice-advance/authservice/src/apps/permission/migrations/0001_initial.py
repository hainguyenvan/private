# Generated by Django 2.2.3 on 2019-10-25 07:40

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('accountinfo', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='PermissionModel',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('func_name', models.CharField(max_length=255, unique=True)),
                ('description', models.TextField(blank=True)),
                ('time_created', models.BigIntegerField(blank=True, default=1571989201, editable=False)),
                ('time_modified', models.BigIntegerField(blank=True, default=1571989201, editable=False)),
                ('created_by', models.ForeignKey(editable=False, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='created_by_permission', to='accountinfo.AccountInfoModel')),
                ('modified_by', models.ForeignKey(editable=False, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='modified_by_permission', to='accountinfo.AccountInfoModel')),
            ],
            options={
                'db_table': 'permission',
            },
        ),
    ]
