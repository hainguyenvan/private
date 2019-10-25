import graphene
from graphene_django import DjangoObjectType
from django.core.paginator import Paginator

from ...modules.auth_token import AuthToken

from ...apps.account.dto import AccountDTO
from ...apps.account.models import AccountModel
from .types import (AccountObjectType, AccountListType, SignInObjectType)
from ...conf.http_res import HTTP_RES
from ...conf.constant import Constant


class Query(graphene.ObjectType):

    sign_in = graphene.Field(
        SignInObjectType, username=graphene.String(required=True), password=graphene.String(required=True))

    get_all_accounts = graphene.Field(AccountListType)

    get_accounts_by_id = graphene.Field(
        AccountObjectType,  id=graphene.String())

    def resolve_sign_in(self, info, username, password):
        try:
            # account = AccountModel.objects.get(id=id)
            acc = AccountDTO.sign_in(username, password)
            if acc is None:
                res = {
                    'status': HTTP_RES.CODE_BAD_REQUEST,
                    'msg': 'Username or password invalid'
                }
                return res

            # succcessfuly
            acc_detail = acc.account_detail
            payload_token = {
                'accountInfoID': str(acc_detail.id)
            }
            # generate token
            token = AuthToken.generate_jwt_token(payload_token)

            # get account
            acc_res = {
                'account_info_id':  str(acc_detail.id),
                'token': token
            }
            res = {
                'status': HTTP_RES.CODE_SUCCESSFULY,
                'msg': HTTP_RES.MSG_SUCCESSFULY,
                'account': acc_res
            }
            return res
        except Exception as err:
            print(err)
            res = {
                'status': HTTP_RES.CODE_BAD_REQUEST,
                'msg': err
            }
            return res

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
