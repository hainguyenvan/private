const AccountModel = require('../models/account');

exports.isUsername = function (req, res, next) {
    let username = req.body.username;
    AccountModel.getByUsername(username)
        .then(data => {
            if (data !== null) {
                res.send({
                    status: 200,
                    msg: 'successfully',
                    data: data
                });
                return;
            }
            next();
        })
        .catch(err => {
            console.log(err);
            res.send({
                status: 500,
                msg: 'field: ' + err
            })
        })
}