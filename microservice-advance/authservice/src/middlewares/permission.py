import jwt
import logging

from ..apps.account.dao import AccountDAO

WHITE_LIST = {
    '__schema',
    'signIn',
    'validateToken'
}

BLACK_LIST = {
    # defaul functions of graphql
    # '__schema'
}


def is_permission(func_name, token):
    try:
        # reject reqeust with black list
        if func_name in BLACK_LIST:
            return False

        # by pass with white list
        if func_name in WHITE_LIST:
            return True

        decode_token = jwt.decode(token, verify=False)
        if decode_token is None:
            logging.getLogger('logger').error('xapikey invalid')
            return None

        # check permisison
        is_superuser = decode_token.get('isSuperuser')
        if is_superuser == True:
            return True

        acc_info_id = decode_token.get('accountInfoID')
        flag_permission = AccountDAO.is_permission(acc_info_id,  func_name)
        if flag_permission == False:
            logging.getLogger('logger').error(
                'You are not allowed to ' + func_name + ' without permission')
        return flag_permission
    except Exception as err:
        logging.getLogger('logger').error(err)
        return False
