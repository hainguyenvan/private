import logging

from .models import AccountModel
from serializers.account import AccountSerializer


class AccountDAO:

    def create_account(acc_id, name):
        try:
            is_exists = AccountModel.objects.filter(id=acc_id).exists()
            acc = {
                "id": acc_id,
                "name": name
            }
            # update if account exists
            if is_exists:
                acc_saved = AccountModel.objects.get(id=acc_id)
                serializer = AccountSerializer(
                    instance=acc_saved, data=acc,  partial=True)
                if serializer.is_valid(raise_exception=True):
                    serializer.save()
                    return True
                else:
                    logging.getLogger('logger').error(serializer.errors)
                    return False

            # create if account not exists
            serializer = AccountSerializer(data=acc)
            if serializer.is_valid():
                serializer.save()
                return True
            else:
                logging.getLogger('logger').error(serializer.errors)
                return False
        except Exception as err:
            logging.getLogger('logger').error(err)
            return False

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
