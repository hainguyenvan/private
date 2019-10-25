from django.contrib.auth.hashers import check_password

from ..account.models import AccountModel


class AccountDTO:
    def __init__(self):
        pass

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
