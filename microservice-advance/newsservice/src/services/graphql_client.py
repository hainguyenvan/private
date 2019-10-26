import requests
import logging


class GraphQLClient:

    def run_query(url, query, token):
        try:
            headers = {'xapikey': token}
            request = requests.post(
                url, json={'query': query}, headers=headers)
            if request.status_code == 200:
                logging.getLogger('logger').info(request.json())
                return request.json()
            return None
        except Exception as err:
            logging.getLogger('logger').error(err)
            return None
