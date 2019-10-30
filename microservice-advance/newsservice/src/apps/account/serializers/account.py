from rest_framework import serializers

from ..models import AccountModel
from ...role.models import RoleModel


class AccountSerializer(serializers.ModelSerializer):

    roles = serializers.PrimaryKeyRelatedField(
        queryset=RoleModel.objects.all(),
        required=False
    )

    class Meta:
        model = AccountModel
        fields = ('id', 'name', 'roles')
