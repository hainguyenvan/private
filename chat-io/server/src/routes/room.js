const validate = require('express-validation');
const Joi = require('joi');

const RoomController = require('../controllers/room');

module.exports = function (router) {

    router.route('/rooms').post(validate({
        body: {
            name: Joi.string().required(),
            members: Joi.array().items({
                userID: Joi.string().required()
            }).required()
        }
    }), RoomController.insert);

    router.route('/rooms').get(RoomController.getAll);
}