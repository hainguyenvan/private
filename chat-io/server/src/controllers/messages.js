const randomstring = require("randomstring");

const RootModel = require('../models/root');

class Messagesontroller {
    constructor() { }

    insert(req, res) {
        let id = randomstring.generate();
        let messages = {
            id: id,
            roomID: req.body.roomID,
            userID: req.body.userID,
            content: req.body.content
        }
        RootModel.insertMessages(messages)
            .then(status => {
                res.send({
                    status: 200,
                    msg: 'successfully',
                    data: messages
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
            data: RootModel.messagesList
        })
    }
}

module.exports = new Messagesontroller();