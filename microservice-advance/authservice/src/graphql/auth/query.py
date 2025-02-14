import graphene
import logging
from graphene_django import DjangoObjectType
from django.core.paginator import Paginator

from ...modules.auth_token import AuthToken

from ...apps.account.dao import AccountDAO
from ...apps.account.models import AccountModel
from .types import (SignInObjectType, ValidateTokenObjectType)
from ...conf.http_res import HTTP_RES
from ...conf.constant import Constant


class Query(graphene.ObjectType):

    sign_in = graphene.Field(
        SignInObjectType, username=graphene.String(required=True), password=graphene.String(required=True))

    validate_token = graphene.Field(
        ValidateTokenObjectType, token=graphene.String(required=True))

    def resolve_validate_token(self, info, token):
        try:
            decode_token = AuthToken.decode_jwt_token(token)
            if decode_token is None:
                res = HTTP_RES.FORBIDDEN
                return res
            res = HTTP_RES.SUCCESSFULY
            return res
        except Exception as err:
            logging.getLogger('logger').error(err)
            res = {
                'status': HTTP_RES.CODE_BAD_REQUEST,
                'msg': err
            }
            return res

    def resolve_sign_in(self, info, username, password):
        try:
            # account = AccountModel.objects.get(id=id)
            acc = AccountDAO.sign_in(username, password)
            if acc is None:
                res = {
                    'status': HTTP_RES.CODE_BAD_REQUEST,
                    'msg': 'Username or password invalid'
                }
                return res

            # succcessfuly
            acc_detail = acc.account_detail
            payload_token = {
                'accountInfoID': str(acc_detail.id),
                'isSuperuser': acc.is_superuser
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
            res = {
                'status': HTTP_RES.CODE_BAD_REQUEST,
                'msg': err
            }
            return res
