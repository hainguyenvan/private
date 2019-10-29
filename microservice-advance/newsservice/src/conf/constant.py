import os


API_AUTH_DEFAULT = 'http://127.0.0.1:8000/graphql/auth-service'


def get_api_auth():
    try:
        auth = os.environ['API_AUTH']
        return auth
    except KeyError:
        # return 'http://192.168.1.41:8000/api/auth-service/auth-api'
        return API_AUTH_DEFAULT


def get_rabbitmq_url():
    try:
        url = os.environ['RABBITMQ_URL']
        return url
    except Exception as err:
        return '192.168.1.41'


def get_rabbitmq_username():
    try:
        username = os.environ['RABBITMQ_USERNAME']
        return username
    except Exception as err:
        return 'guest'


def get_rabbitmq_password():
    try:
        password = os.environ['RABBITMQ_PASSWORDs']
        return password
    except Exception as err:
        return 'guest'


class Constant:
    API_AUTH = get_api_auth()

    # rabbitmq
    RABBITMQ_URL = get_rabbitmq_url()
    RABBITMQ_USERNAME = get_rabbitmq_username()
    RABBITMQ_PASSWORD = get_rabbitmq_password()

    ITEMS_PER_PAGE = 10
