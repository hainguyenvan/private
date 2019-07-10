const AccountModel = require('../models/account');
const { getAllUser, getUserByID } = require('../graphql/gql/user');
const GQLClient = require('../graphql/gql-client');

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

    getAll(req, res) {
        GQLClient.request(getAllUser)
            .then(data => {
                res.send({
                    status: 200,
                    msg: 'successfully',
                    data: data
                })
            })
            .catch(err => {
                res.send({
                    status: 500,
                    msg: err
                })
            })
    }

    getByID(req, res) {
        let id = req.body.id;
        GQLClient.request(getUserByID(id))
            .then(data => {
                res.send({
                    status: 200,
                    msg: 'successfully',
                    data: data
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