const bodyParser = require('body-parser');
const { isTokenExpiresIn } = require('./user');

function createHeaderFake(req, res, next) {
    if (req.headers.token === undefined || req.headers.token === null) {
        req.headers.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHZpZXRtZWQuY29tLnZuIiwiaWQiOjEsInBrIjoiVVNSXzAiLCJpYXQiOjE1NTgzMTc0NzAsImV4cCI6MTU1ODQwMzg3MH0.mH7PjXPzPN8EhF7skxf0n11LyZt_2BJi41EYLrWJh5Y';
    }
    next();
}

exports.middlewaresList = [
    bodyParser.json(),
    createHeaderFake,
    isTokenExpiresIn
];