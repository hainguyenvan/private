import os


def get_api_auth():
    try:
        auth = os.environ['API_AUTH']
        return auth
    except KeyError:
        # return 'http://192.168.1.41:8000/api/auth-service/auth-api'
        return 'http://127.0.0.1:8000/graphql/auth-service'


class Constant:
    API_AUTH = get_api_auth()

    ITEMS_PER_PAGE = 10
