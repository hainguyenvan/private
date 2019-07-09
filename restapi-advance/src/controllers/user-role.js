const UserRoleModel = require('../models/user-role');

class UserRoleController {
    constructor() {}

    insert(req, res) {
        let data = req.body;
        UserRoleModel.insert(data)
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

module.exports = new UserRoleController();