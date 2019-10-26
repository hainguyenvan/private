import logging

from ..conf.http_res import HTTP_RES
from ..services.auth.service import AuthService
from .permission import is_permission

WHITE_LIST = {
    '__schema'
}

BLACK_LIST = {
}


def main_middleware(next, root, info, **args):
    try:
        # get graphql function
        func_name = info.path[0]

        # reject reqeust with black list
        if func_name in BLACK_LIST:
            return None

        # root is None (request)
        # root is`t None (response)
        if root == None:
            # by pass with white list not header
            if func_name in WHITE_LIST:
                return next(root, info, **args)

            api_key = info.context.META.get('HTTP_XAPIKEY')
            if api_key is None:
                logging.getLogger('logger').error('xapikey is null')
                return None

            # validate token
            is_token = AuthService.validate_toke(api_key)
            if is_token == False:
                logging.getLogger('logger').error('xapikey invalid')
                return None

            # check permission
            flag_permission = is_permission(func_name, api_key)
            if flag_permission == False:
                return None

            # by pass auth
            return next(root, info, **args)

        return next(root, info, **args)
    except Exception as err:
        logging.getLogger('logger').error(err)
        return None
