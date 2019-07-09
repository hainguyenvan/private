const validate = require('express-validation');
const Joi = require('joi');

const UserRoleController = require('../controllers/user-role');

module.exports = function(router) {

    router.route('/user-role/insert').post(validate({
        body: {
            userID: Joi.number().required(),
            roleID: Joi.number().required()
        }
    }), UserRoleController.insert);
}