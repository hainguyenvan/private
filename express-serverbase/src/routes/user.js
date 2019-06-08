const validate = require('express-validation');
const Joi = require('joi');

const UserController = require('../controllers/user');

module.exports = function (router) {

    // login data
    router.route('/user/login').post(validate({
        body: {
            email: Joi.string().required(),
            passwd: Joi.string().required()
        }
    }), UserController.login);
}