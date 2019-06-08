const JWT = require('jsonwebtoken');

const UserModel = require('../models/user');
const { ErrorName } = require('../config/error-type');
const Config = require('../config/config');
const { decodeToke } = require('../utils/utils');

class UserController {
    constructor() {
    }

    login(req, res) {
        let email = req.body.email;
        let passwd = req.body.passwd;
        UserModel.validateUser(email, passwd)
            .then(user => {
                let payloadToken = {
                    email: user.email,
                    id: user.id,
                    pk: user.pk
                }

                // generate token with jwt, expires: 1 days
                let token = JWT.sign(payloadToken, Config.SECRET_JWT, { expiresIn: Config.EXPIRES_IN_TOKEN });
                let auth = {
                    token: token,
                    userInfo: {
                        id: user.id,
                        email: user.email,
                        pk: user.pk,
                        fullName: user.fullName,
                        avatar: user.avatar
                    }
                }
                res.send({
                    status: 200,
                    msg: `successful.`,
                    data: auth
                });
            })
            .catch(err => {
                res.send({
                    status: 401,
                    msg: `Oops! Email or password invalid.`
                });
            })
    }

    getAll() {
        return new Promise((fulfill, reject) => {
            UserModel.getAll()
                .then(dataList => {
                    fulfill(dataList);
                })
                .catch(err => {
                    console.log(err);
                    reject(ErrorName.OTHER);
                })
        })
    }

    getByPK(pk) {
        return new Promise((fulfill, reject) => {
            UserModel.getByPK(pk)
                .then(user => {
                    fulfill(user);
                })
                .catch(err => {
                    console.log(err);
                    reject(ErrorName.OTHER);
                })
        })
    }

    getByDataStatus(dataStatus) {
        return new Promise((fulfill, reject) => {
            UserModel.getByDataStatus(dataStatus)
                .then(dataList => {
                    fulfill(dataList);
                })
                .catch(err => {
                    console.log(err);
                    reject(ErrorName.OTHER);
                })
        })
    }

    insert(payload) {
        let tokenData = decodeToke(payload.token);
        payload.createdBy = tokenData.pk;
        payload.modifiedBy = tokenData.pk;
        return new Promise((fulfill, reject) => {
            UserModel.insert(payload)
                .then(data => {
                    fulfill(data);
                })
                .catch(err => {
                    console.log(err);
                    reject(ErrorName.OTHER);
                })
        });
    }

    updateByPK(payload) {
        let tokenData = decodeToke(payload.token);
        payload.modifiedBy = tokenData.pk;
        return new Promise((fulfill, reject) => {
            UserModel.updateByPK(payload)
                .then(data => {
                    fulfill(data);
                })
                .catch(err => {
                    console.log(err);
                    reject(ErrorName.OTHER);
                })
        });
    }

    deleteByPK(payload) {
        let tokenData = decodeToke(payload.token);
        payload.modifiedBy = tokenData.pk;
        return new Promise((fulfill, reject) => {
            UserModel.deleteByPK(payload)
                .then(status => {
                    fulfill(status);
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                })
        })
    }
}

module.exports = new UserController();