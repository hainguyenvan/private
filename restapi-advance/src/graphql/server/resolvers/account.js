const AccountModel = require('../../../models/account');
const RoleModel = require('../../../models/role');

const Account = {
    roleDetail(root) {
        let accountID = root.id;
        return RoleModel.getRoleByAccountID(accountID)
            .then(dataList => {
                return dataList;
            })
            .catch(err => {
                return [];
            });
    }
}

const Query = {
    getAllAccount(root, args, context, info) {
        return AccountModel.getAll()
            .then(dataList => {
                return dataList;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    },

    getAccountByID(root, args, context, info) {
        let id = args.id;
        return AccountModel.getByID(id)
            .then(account => {
                return account;
            })
            .catch(err => {
                return {}
            });
    }
}


module.exports = {
    Query,
    Account
}