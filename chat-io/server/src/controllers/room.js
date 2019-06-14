const randomstring = require("randomstring");

const RootModel = require('../models/root');

class RoomController {
    constructor() { }

    insert(req, res) {
        let id = randomstring.generate();
        let room = {
            id: id,
            name: req.body.name,
            members: req.body.members
        }
        RootModel.insertRoom(room)
            .then(status => {
                res.send({
                    status: 200,
                    msg: 'successfully',
                    data: room
                })
            })
            .catch(err => {
                res.send({
                    status: 500,
                    msg: 'faild',
                })
            })
    }

    getAll(req, res) {
        res.send( {
            status: 200,
            msg: 'successfully',
            data: RootModel.roomList
        })
    }
}

module.exports = new RoomController();