const validate = require('express-validation');
const Joi = require('joi');

const AccountController = require('../controllers/account');

module.exports = function(router) {

    router.route('/account/insert').post(validate({
        body: {
            name: Joi.string().required(),
            age: Joi.string().required(),
            address: Joi.string().required(),
        }
    }), AccountController.insert);

    router.route('/account/getAll').post(AccountController.getAll);

    router.route('/account/getByID').post(validate({
        body: {
            id: Joi.number().required(),
        }
    }), AccountController.getByID);
}