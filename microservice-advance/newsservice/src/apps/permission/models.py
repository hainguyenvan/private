import calendar
import time
import uuid

from django.db import models


class PermissionModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    func_name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True)

    time_created = models.BigIntegerField(
        default=calendar.timegm(time.gmtime()), editable=False, blank=True)
    time_modified = models.BigIntegerField(
        default=calendar.timegm(time.gmtime()), editable=False, blank=True)
    created_by = models.TextField(editable=False, null=True, blank=True)
    modified_by = models.TextField(editable=False, null=True, blank=True)

    def __str__(self):
        return self.name

    # custom method save
    def save(self, *args, **kwargs):
        self.time_modified = calendar.timegm(time.gmtime())
        if self._state.adding is True:
            self.time_created = calendar.timegm(time.gmtime())
        super(PermissionModel, self).save(*args, **kwargs)

    class Meta:
        db_table = 'permission'
