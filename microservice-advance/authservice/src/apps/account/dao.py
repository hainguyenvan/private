import logging

from django.contrib.auth.hashers import check_password

from .models import AccountModel


class AccountDAO:
    def is_permission(acc_info_id, func_name):
        try:
            count_permission = AccountModel.objects.filter(
                account_detail=acc_info_id).filter(roles__permissions__func_name=func_name).count()
            if count_permission > 0:
                return True

            return False
        except Exception as err:
            logging.getLogger('logger').error(err)
            return False

    def sign_in(username, pwd):
        try:
            acc_data = AccountModel.objects.get(username=username)
            if acc_data.is_active == False:
                return None
            hashed_pwd = acc_data.password
            check_pwd = check_password(pwd, hashed_pwd)
            if check_pwd:
                return acc_data

            return None
        except Exception as err:
            return None
