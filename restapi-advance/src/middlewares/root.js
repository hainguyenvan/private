const bodyParser = require('body-parser');
// const { isTokenExpiresIn } = require('./user');

function createHeaderFake(req, res, next) {
    console.log('data ===============');
    next();
}

exports.middlewaresList = [
    bodyParser.json(),
    // createHeaderFake,
    // isTokenExpiresIn
];