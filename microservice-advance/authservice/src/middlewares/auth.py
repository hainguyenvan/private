from ..conf.http_res import HTTP_RES
from ..modules.auth_token import AuthToken

WHITE_LIST = {
    'signIn'
}

BLACK_LIST = {
    '__schema'
}


def validate_auth(next, root, info, **args):
    try:
        func_name = info.path[0]

        # reject reqeust with black list
        if func_name in BLACK_LIST:
            return None

        # root is None (request)
        # root is`t None (response)
        if root == None:
            # by pass with white list
            if func_name in WHITE_LIST:
                return next(root, info, **args)

            api_key = info.context.META['HTTP_XAPIKEY']
            if api_key is None:
                return None

            decode_token = AuthToken.decode_jwt_token(api_key)
            if decode_token is None:
                return None

            # by pass auth
            return next(root, info, **args)

        return next(root, info, **args)
    except Exception as err:
        return HTTP_RES.FORBIDDEN
