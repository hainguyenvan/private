from graphene_django import DjangoObjectType
import graphene

from ..common.types import PaginationType
from ...apps.account.models import AccountModel


class AccountType(DjangoObjectType):
    class Meta:
        model = AccountModel


class AccountListType(graphene.ObjectType):
    status = graphene.Int()
    msg = graphene.String()
    pagination = graphene.Field(PaginationType)
    accounts = graphene.List(AccountType)


class AccountObjectType(graphene.ObjectType):
    status = graphene.Int()
    msg = graphene.String()
    account = graphene.Field(AccountType)
