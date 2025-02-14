import graphene
from graphene_django import DjangoObjectType
from django.core.paginator import Paginator

from ...modules.auth_token import AuthToken

from ...apps.account.models import AccountModel
from .types import (AccountObjectType, AccountListType)
from ...conf.http_res import HTTP_RES
from ...conf.constant import Constant


class Query(graphene.ObjectType):

    get_all_accounts = graphene.Field(AccountListType)

    get_accounts_by_id = graphene.Field(
        AccountObjectType,  id=graphene.String())

    def resolve_get_accounts_by_id(self, info, id):
        try:
            account = AccountModel.objects.get(id=id)
            res = {
                'status': HTTP_RES.CODE_SUCCESSFULY,
                'msg': HTTP_RES.MSG_SUCCESSFULY,
                'account': account
            }
            return res
        except Exception as err:
            res = {
                'status': HTTP_RES.CODE_BAD_REQUEST,
                'msg': err
            }
            return res

    def resolve_get_all_accounts(self, info):
        try:
            accounts = AccountModel.objects.all()
            res = {
                'status': HTTP_RES.CODE_SUCCESSFULY,
                'msg': HTTP_RES.MSG_SUCCESSFULY,
                'accounts': accounts
            }
            return res
        except Exception as err:
            res = {
                'status': HTTP_RES.CODE_BAD_REQUEST,
                'msg': err
            }
            return res
