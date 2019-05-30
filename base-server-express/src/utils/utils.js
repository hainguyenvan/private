const JWT = require('jsonwebtoken');

exports.decodeToke = function (token) {
    let tokenJson = JWT.decode(token, {
        complete: true
    });
    return tokenJson.payload;
}