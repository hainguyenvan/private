import json
import logging
import re
import requests
import jwt

from django.http import JsonResponse

from ..conf.http_res import HTTP_RES


class AuthMiddleware:

    def __init__(self, get_response):
        self.get_response = get_response
        pass

    def __call__(self, req):
        res = self.get_response(req)
        return res

    # set name api key: xapikey
    def process_view(self, req, view_func, view_args, view_kwargs):
        try:
            current_url = req.get_full_path()

            # not check xapikey
            is_admin_page = re.search("^/admin", current_url)
            if(is_admin_page):
                return None

            api_key = req.META['HTTP_XAPIKEY']
            # shop_id = req.META['HTTP_SHOPID']

            # auth api
            decode_token = AuthToken.decode_jwt_token(api_key)
            if decode_token is None:
                res = HTTP_RES.BAD_REQUEST
                return JsonResponse(res, status=HTTP_RES.CODE_BAD_REQUEST)

            return None
        except Exception as err:
            res = HTTP_RES.BAD_REQUEST
            res['msg'] = str(err)
            return JsonResponse(res, status=HTTP_RES.CODE_BAD_REQUEST)
