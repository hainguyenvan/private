import jwt
import logging

from ..apps.account.dao import AccountDAO
from ..conf.http_res import HTTP_RES
from ..modules.auth_token import AuthToken

WHITE_LIST = {
    '__schema',
    'signIn'
}

BLACK_LIST = {
    # defaul functions of graphql
    # '__schema'
}


def validate_permission(next, root, info, **args):
    try:
        func_name = info.path[0]

        # # reject reqeust with black list
        if func_name in BLACK_LIST:
            return None

        # root is None (request)
        # root is`t None (response)
        if root == None:
            # by pass with white list
            if func_name in WHITE_LIST:
                return next(root, info, **args)

            api_key = info.context.META.get('HTTP_XAPIKEY')
            if api_key is None:
                logging.getLogger('logger').error('xapikey is null')
                return None

            decode_token = AuthToken.decode_jwt_token(api_key)
            if decode_token is None:
                logging.getLogger('logger').error('xapikey invalid')
                return None

            # check permisison
            is_superuser = decode_token.get('isSuperuser')
            if is_superuser == True:
                return next(root, info, **args)

            acc_info_id = decode_token.get('accountInfoID')
            is_permission = AccountDAO.is_permission(acc_info_id,  func_name)
            if is_permission == False:
                logging.getLogger('logger').error(
                    'You are not allowed to ' + func_name + ' without permission')
                return None

            # by pass auth
            return next(root, info, **args)

        return next(root, info, **args)
    except Exception as err:
        print(err)
        logging.getLogger('logger').error(err)
        return None
