const randomstring = require("randomstring");

const MembersModel = require('../models/members');

class MembersController {
    constructor() { }

    insert(req, res) {
        let pk = randomstring.generate();
        let members = {
            pk: pk,
            roomPK: req.body.roomPK,
            userPK: req.body.userPK,
        }
        MembersModel.insert(members)
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
                    msg: 'faild: ' + err,
                })
            })
    }
}

module.exports = new MembersController();