from graphene_django import DjangoObjectType
import graphene

from ..common.types import PaginationType
from ...apps.account.models import AccountModel


# type sign in
class SignInType(graphene.ObjectType):
    account_info_id = graphene.String()
    token = graphene.String()


class SignInObjectType(graphene.ObjectType):
    status = graphene.Int()
    msg = graphene.String()
    account = graphene.Field(SignInType)
# end type sign in
