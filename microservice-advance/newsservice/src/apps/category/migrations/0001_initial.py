# Generated by Django 2.0.5 on 2019-10-24 14:09

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('account', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='CategoryModel',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField(blank=True)),
                ('time_created', models.BigIntegerField(blank=True, default=1571926144, editable=False)),
                ('time_modified', models.BigIntegerField(blank=True, default=1571926144, editable=False)),
                ('created_by', models.ForeignKey(editable=False, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='category_created_by', to='account.AccountModel')),
                ('modified_by', models.ForeignKey(editable=False, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='category_modified_by', to='account.AccountModel')),
            ],
            options={
                'ordering': ('-time_modified',),
                'db_table': 'category',
            },
        ),
    ]
