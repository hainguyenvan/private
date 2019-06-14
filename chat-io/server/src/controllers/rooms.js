const randomstring = require("randomstring");

const RoomsModel = require('../models/rooms');
const MembersModel = require('../models/members');

class RoomsController {
    constructor() { }

    insert(req, res) {
        let pk = randomstring.generate();
        let room = {
            pk: pk,
            name: req.body.name
        }
        RoomsModel.insert(room)
            .then(roomData => {
                let members = req.body.members;
                MembersModel.insertMutipleByRoomPK(members, roomData.pk)
                    .then(status => {
                        res.send({
                            status: 200,
                            msg: 'successfully',
                            data: roomData
                        })
                    })
                    .catch(err => {
                        res.send({
                            status: 500,
                            msg: 'faild: ' + err,
                        })
                    })

            })
            .catch(err => {
                res.send({
                    status: 500,
                    msg: 'faild: ' + err,
                })
            })
    }

    getAll(req, res) {
        RoomsModel.getAll()
            .then(roomsList => {
                res.send({
                    status: 200,
                    msg: 'successfully',
                    data: roomsList
                })
            })
            .catch(err => {
                res.send({
                    status: 500,
                    msg: 'faild: ' + err,
                })
            })
    }

    getByPK(req, res) {
        let pk = req.body.pk;
        RoomsModel.getByPK(pk)
            .then(dataList => {
                res.send({
                    status: 200,
                    msg: 'successfully',
                    data: dataList
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

module.exports = new RoomsController();