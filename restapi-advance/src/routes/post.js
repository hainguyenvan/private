const validate = require('express-validation');
const Joi = require('joi');

const PostController = require('../controllers/post');

module.exports = function(router) {

    router.route('/post/insert').post(validate({
        body: {
            title: Joi.string().required(),
            author: Joi.number().required(),
        }
    }), PostController.insert);
}