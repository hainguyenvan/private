import calendar
import time
import uuid

from django.db import models
from django.contrib.auth.hashers import make_password
from django.core.validators import RegexValidator

from ..role.models import RoleModel
from ..accountinfo.models import AccountInfoModel

# validate password
password_format = '(?=.*[a-z])	The string must contain at least 1 lowercase alphabetical character. ' + \
    '(?=.*[A-Z])	The string must contain at least 1 uppercase alphabetical character. ' + \
    '(?=.*[0-9])	The string must contain at least 1 numeric character. ' + \
    '(?=.[!@#\$%\^&])	The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict. ' + \
    '(?=.{8,})	The string must be eight characters or longer'
password_validator = RegexValidator(
    r"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})", password_format)


class AccountModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    username = models.CharField(max_length=255, unique=True)
    password = models.TextField(validators=[password_validator])
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)

    roles = models.ManyToManyField(
        RoleModel, blank=True, related_name="role_account")

    time_created = models.BigIntegerField(
        default=calendar.timegm(time.gmtime()), editable=False)
    time_modified = models.BigIntegerField(
        default=calendar.timegm(time.gmtime()), editable=False)
    created_by = models.ForeignKey(AccountInfoModel, on_delete=models.CASCADE,
                                   editable=False, null=True, related_name="created_by_account")
    modified_by = models.ForeignKey(
        AccountInfoModel, on_delete=models.CASCADE, editable=False, null=True, related_name="modified_by_account")

    def __str__(self):
        return self.email

    # custom method save
    def save(self, *args, **kwargs):
        self.time_modified = calendar.timegm(time.gmtime())
        if self._state.adding is True:
            self.time_created = calendar.timegm(time.gmtime())
        super(AccountModel, self).save(*args, **kwargs)

    class Meta:
        db_table = 'account'
