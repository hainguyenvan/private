const PostModel = require('../models/post');

class PostController {
    constructor() {}

    insert(req, res) {
        let data = req.body;
        PostModel.insert(data)
            .then(status => {
                res.send({
                    status: 200,
                    msg: 'successfully'
                })
            })
            .catch(err => {
                res.send({
                    status: 500,
                    msg: err
                })
            })
    }
}

module.exports = new PostController();