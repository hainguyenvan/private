import graphene
from graphene_django import DjangoObjectType
from django.core.paginator import Paginator

from ...apps.account.models import AccountModel
from .types import (AccountNewsObjectType, AccountNewsListType)
from ...conf.http_res import HTTP_RES
from ...conf.constant import Constant


class Query(graphene.ObjectType):

    get_all_accounts_news = graphene.Field(AccountNewsListType)

    def resolve_get_all_accounts_news(self, info):
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
