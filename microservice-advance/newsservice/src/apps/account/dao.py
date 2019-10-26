import logging

from .models import AccountModel


class AccountDAO:
    def is_permission(acc_id, func_name):
        try:
            count_permission = AccountModel.objects.filter(id=acc_id).filter(
                roles__permissions__func_name=func_name).count()
            if count_permission > 0:
                return True

            return False
        except Exception as err:
            logging.getLogger('logger').error(err)
            return False
