const validate = require('express-validation');
const Joi = require('joi');

// middlewares
const { isUsername } = require('../middlewares/account');

const UserController = require('../controllers/account');

module.exports = function (router) {

    router.route('/account/insert').post(validate({
        username: Joi.string().required()
    }), isUsername, UserController.insert);

    router.route('/account/getAll').post(UserController.getAll);

    router.route('/account/getByPK').post(validate({
        pk: Joi.string().required()
    }), UserController.getByPK);

}