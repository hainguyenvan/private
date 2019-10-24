from graphene_django import DjangoObjectType
import graphene

from ..common.types import PaginationType
from ...apps.account.models import AccountModel


class AccountNewsType(DjangoObjectType):
    class Meta:
        model = AccountModel


class AccountNewsListType(graphene.ObjectType):
    status = graphene.Int()
    msg = graphene.String()
    pagination = graphene.Field(PaginationType)
    accounts = graphene.List(AccountNewsType)


class AccountNewsObjectType(graphene.ObjectType):
    status = graphene.Int()
    msg = graphene.String()
    account = graphene.Field(AccountNewsType)
