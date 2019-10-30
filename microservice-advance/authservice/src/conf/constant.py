import os


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
    # rabbitmq
    RABBITMQ_URL = get_rabbitmq_url()
    RABBITMQ_USERNAME = get_rabbitmq_username()
    RABBITMQ_PASSWORD = get_rabbitmq_password()

    ITEMS_PER_PAGE = 10

    # rabbitmq queue
    QUEUE_NEWS = 'news'
    TYPE_PAYLOAD_QUEUE_CREATE_ACCOUNT = 'create_account'
