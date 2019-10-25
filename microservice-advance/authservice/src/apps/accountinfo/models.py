import calendar
import time
import uuid

from django.db import models


class AccountInfoModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    email = models.EmailField(unique=True)
    firstname = models.CharField(max_length=255)
    lastname = models.CharField(max_length=255)

    time_created = models.BigIntegerField(
        default=calendar.timegm(time.gmtime()), editable=False)
    time_modified = models.BigIntegerField(
        default=calendar.timegm(time.gmtime()), editable=False)
    # created_by = models.ForeignKey(
    #     'self',  editable=False, null=True, related_name="created_by_account_info")
    # modified_by = models.ForeignKey(
    #     'self', editable=False, null=True, related_name="modified_by_account_info")

    def __str__(self):
        return self.email

    # custom method save
    def save(self, *args, **kwargs):
        self.time_modified = calendar.timegm(time.gmtime())
        if self._state.adding is True:
            self.time_created = calendar.timegm(time.gmtime())
        super(AccountInfoModel, self).save(*args, **kwargs)

    class Meta:
        db_table = 'account_info'
