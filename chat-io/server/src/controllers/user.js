const randomstring = require("randomstring");

const RootModel = require('../models/root');

class UserController {

    constructor() {
    }

    insert(req, res) {
        let id = randomstring.generate();
        let user = {
            id: id,
            username: req.body.username
        }
        RootModel.insertUser(user)
            .then(status => {
                res.send({
                    status: 200,
                    msg: 'successfully',
                    data: user
                })
            })
            .catch(err => {
                res.send({
                    status: 500,
                    msg: 'faild',
                })
            })
    }

    getAll(req,res) {
        res.send({
            status: 200,
            msg: 'successfully',
            data: RootModel.userList
        })
    }
}

module.exports = new UserController();