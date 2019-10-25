# import modules
import datetime
import jwt

# import file
# import secret
from .secret import SECRET


class AuthToken:
    def __init__(self):
        pass

    def generate_jwt_token(payload=''):
        if payload == '':
            return None

        # set exp token is  24h
        payload['exp'] = datetime.datetime.utcnow() + \
            datetime.timedelta(seconds=86400)
        api_key = jwt.encode(payload,
                             SECRET.SECRET_TOKEN_KEY, algorithm='HS256')
        return api_key

    def decode_jwt_token():
        if api_key == '':
            return None
        try:
            decode = jwt.decode(
                api_key, SECRET.SECRET_TOKEN_KEY, algorithms=['HS256'])
            return decode
        except:
            return None
