import calendar
import time
import uuid

from django.db import models

from ..role.models import RoleModel


class AccountModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=255)

    roles = models.ManyToManyField(
        RoleModel, blank=True, related_name="role_account")

    time_created = models.BigIntegerField(
        default=calendar.timegm(time.gmtime()), editable=False)
    time_modified = models.BigIntegerField(
        default=calendar.timegm(time.gmtime()), editable=False)

    def __str__(self):
        return self.name

    # custom method save
    def save(self, *args, **kwargs):
        self.time_modified = calendar.timegm(time.gmtime())
        if self._state.adding is True:
            self.time_created = calendar.timegm(time.gmtime())
        super(AccountModel, self).save(*args, **kwargs)

    class Meta:
        db_table = 'account'
