# Generated by Django 2.0.5 on 2019-10-26 08:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='postmodel',
            name='time_created',
            field=models.BigIntegerField(blank=True, default=1572079903, editable=False),
        ),
        migrations.AlterField(
            model_name='postmodel',
            name='time_modified',
            field=models.BigIntegerField(blank=True, default=1572079903, editable=False),
        ),
    ]
