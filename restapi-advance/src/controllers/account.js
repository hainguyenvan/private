const AccountModel = require('../models/account');

class AccountController {
    constructor() {}

    insert(req, res) {
        let data = req.body;
        AccountModel.insert(data)
            .then(status => {
                res.send({
                    status: 200,
                    msg: 'successfully'
                })
            })
            .catch(err => {
                res.send({
                    status: 500,
                    msg: err
                })
            })
    }
}

module.exports = new AccountController();