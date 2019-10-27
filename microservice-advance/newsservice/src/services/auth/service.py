import logging

from ...conf.constant import Constant
from .query import AuthQuery
from ..graphql_client import GraphQLClient


class AuthService:
    def validate_toke(token):
        try:
            url = Constant.API_AUTH
            query = AuthQuery.get_query_validate_token(token)
            is_token = GraphQLClient.run_query(url, query, token)
            if is_token is not None and is_token.get('data').get('validateToken').get('status') == 200:
                return True
            return False
        except Exception as err:
            logging.getLogger('logger').error(err)
            return False
