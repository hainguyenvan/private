from graphene_django import DjangoObjectType
import graphene

from ..common.types import PaginationType
from ...apps.accountinfo.models import AccountInfoModel


class AccountInfoType(DjangoObjectType):
    class Meta:
        model = AccountInfoModel


class AccountInfoListType(graphene.ObjectType):
    status = graphene.Int()
    msg = graphene.String()
    pagination = graphene.Field(PaginationType)
    accounts_info = graphene.List(AccountInfoType)


class AccountInfoObjectType(graphene.ObjectType):
    status = graphene.Int()
    msg = graphene.String()
    accounts_info = graphene.Field(AccountInfoType)
