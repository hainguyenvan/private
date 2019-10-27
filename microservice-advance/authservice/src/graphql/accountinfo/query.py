import graphene
from graphene_django import DjangoObjectType
from django.core.paginator import Paginator

from ...modules.auth_token import AuthToken

from ...apps.accountinfo.models import AccountInfoModel
from .types import (AccountInfoObjectType, AccountInfoListType)
from ...conf.http_res import HTTP_RES
from ...conf.constant import Constant


class Query(graphene.ObjectType):

    get_all_accounts_info = graphene.Field(AccountInfoListType)

    get_accounts_info_by_id = graphene.Field(
        AccountInfoObjectType,  id=graphene.String())

    def resolve_get_accounts_info_by_id(self, info, id):
        try:
            accounts_info = AccountInfoModel.objects.get(id=id)
            res = {
                'status': HTTP_RES.CODE_SUCCESSFULY,
                'msg': HTTP_RES.MSG_SUCCESSFULY,
                'accounts_info': accounts_info
            }
            return res
        except Exception as err:
            res = {
                'status': HTTP_RES.CODE_BAD_REQUEST,
                'msg': err
            }
            return res

    def resolve_get_all_accounts_info(self, info):
        try:
            accounts = AccountInfoModel.objects.all()
            res = {
                'status': HTTP_RES.CODE_SUCCESSFULY,
                'msg': HTTP_RES.MSG_SUCCESSFULY,
                'accounts_info': accounts
            }
            return res
        except Exception as err:
            res = {
                'status': HTTP_RES.CODE_BAD_REQUEST,
                'msg': err
            }
            return res
