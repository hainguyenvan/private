const validate = require('express-validation');
const Joi = require('joi');

const RoleController = require('../controllers/role');

module.exports = function(router) {

    router.route('/role/insert').post(validate({
        body: {
            name: Joi.string().required()
        }
    }), RoleController.insert);
}