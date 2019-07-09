const RoleModel = require('../models/role');

class RoleController {
    constructor() {}

    insert(req, res) {
        let data = req.body;
        RoleModel.insert(data)
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

module.exports = new RoleController();