const validate = require('express-validation');
const Joi = require('joi');

const UserController = require('../controllers/user');

module.exports = function (router) {

    router.route('/users').post(validate({
        body: {
            username: Joi.string().required()
        }
    }), UserController.insert);

    router.route('/users').get(UserController.getAll);

}