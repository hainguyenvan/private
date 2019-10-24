class HTTP_RES:
    CODE_SUCCESSFULY = 200
    CODE_BAD_REQUEST = 400
    CODE_UNAUTHORIZED = 401
    CODE_FORBIDDEN = 403
    CODE_INTERNAL_SERVER = 500

    # msg
    MSG_SUCCESSFULY = 'Successfully'

    SUCCESSFULY = {
        'status': 200,
        'msg': 'Successfully',
        'data': ''
    }

    BAD_REQUEST = {
        'status': 400,
        'msg': 'Bad request'
    }

    UNAUTHORIZED = {
        'status': 401,
        'msg': 'Required headers for request'
    }

    FORBIDDEN = {
        'status': 403,
        'msg': 'Request not have the permissions to access'
    }

    INTERNAL_SERVER = {
        'status': 500,
        'msg': 'Internal server error'
    }
