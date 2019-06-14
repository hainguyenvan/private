const validate = require('express-validation');
const Joi = require('joi');

const RoomsController = require('../controllers/rooms');

module.exports = function (router) {

    router.route('/rooms/insert').post(validate({
        body: {
            name: Joi.string().required(),
            members: Joi.array().items({
                userPK: Joi.string().required()
            }).required()
        }
    }), RoomsController.insert);

    router.route('/rooms/getByPK').post(validate({
        body: {
            pk: Joi.string().required()
        }
    }), RoomsController.getByPK);

    router.route('/rooms/getAll').post(RoomsController.getAll);
}