const randomstring = require("randomstring");

const AccountModel = require('../models/account');

class AccountController {

    constructor() {
    }

    insert(req, res) {
        let pk = randomstring.generate();
        let account = {
            pk: pk,
            username: req.body.username
        }
        AccountModel.insert(account)
            .then(data => {
                res.send({
                    status: 200,
                    msg: 'successfully',
                    data: data
                })
            })
            .catch(err => {
                console.log(err);
                res.send({
                    status: 500,
                    msg: 'faild: ' + err,
                })
            })
    }

    getByPK(req, res) {
        let pk = req.body.pk;
        AccountModel.getByPK(pk)
            .then(data => {
                res.send({
                    status: 200,
                    msg: 'successfully',
                    data: data
                })
            })
            .catch(err => {
                console.log(err);
                res.send({
                    status: 500,
                    msg: 'faild: ' + err,
                })
            })

    }

    getAll(req, res) {
        AccountModel.getAll()
            .then(data => {
                res.send({
                    status: 200,
                    msg: 'successfully',
                    data: data
                })
            })
            .catch(err => {
                console.log(err);
                res.send({
                    status: 500,
                    msg: 'faild: ' + err,
                })
            })
    }
}

module.exports = new AccountController();