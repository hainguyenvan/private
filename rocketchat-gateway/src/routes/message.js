const validate = require('express-validation');
const Joi = require('joi');

// middlewares

const MessageController = require('../controllers/message');

module.exports = function (router) {

    router.route('/message/sendToServer').post(validate({
        name: Joi.string().required(),
        email: Joi.string().required()
    }), MessageController.insert);
}