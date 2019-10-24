import calendar
import time
import uuid

from django.db import models

from ..account.models import AccountModel


class CategoryModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)

    time_created = models.BigIntegerField(
        default=calendar.timegm(time.gmtime()), editable=False, blank=True)
    time_modified = models.BigIntegerField(
        default=calendar.timegm(time.gmtime()), editable=False, blank=True)
    created_by = models.ForeignKey(
        AccountModel, on_delete=models.CASCADE, editable=False, null=True, related_name="category_created_by")
    modified_by = models.ForeignKey(
        AccountModel, on_delete=models.CASCADE, editable=False, null=True, related_name="category_modified_by")

    def __str__(self):
        return self.name

    # custom method save
    def save(self, *args, **kwargs):
        self.time_modified = calendar.timegm(time.gmtime())
        if self._state.adding is True:
            self.time_created = calendar.timegm(time.gmtime())
        super(CategoryModel, self).save(*args, **kwargs)

    class Meta:
        db_table = 'category'
        ordering = ('-time_modified',)
