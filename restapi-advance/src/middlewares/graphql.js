const Config = require('../config/config');

exports.isAPIKeyGraphQL = function(req, res, next) {
    let apiKey = req.headers.api_key;
    // if (apiKey !== Config.API_KEY_GRAPHQL) {
    //     res.send({
    //         msg: 'You have not permission to access'
    //     });
    //     return;
    // }
    next();
}