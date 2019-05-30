const JWT = require('jsonwebtoken');

const UserModel = require('../models/user');

const Config = require('../config/config');

exports.isTokenExpiresIn = function (req, res, next) {
    let token = req.headers.token;
    if (token === undefined || token === null || token === '') {
        res.send({
            status: 401,
            msg: `Oops!, Token invalid.`
        });
    } else {
        JWT.verify(token, Config.SECRET_JWT, function (err, decoded) {
            if (err) {
                res.send({
                    status: 401,
                    msg: `Oops!, Token invalid.`
                });
            } else {
                let email = decoded.email;
                UserModel.isEmail(email)
                    .then(status => {
                        if (status) {
                            next();
                        } else {
                            res.send({
                                status: 401,
                                msg: `Oops!, Token invalid.`
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        res.send({
                            status: 401,
                            msg: `Oops!, Token invalid.`
                        });
                    })
            }
        })
    }
}