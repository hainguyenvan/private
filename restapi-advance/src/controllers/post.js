const PostModel = require('../models/post');
const { getAllPost } = require('../graphql/gql/post');
const GQLClient = require('../graphql/gql-client');

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

    getAll(req, res) {
        GQLClient.request(getAllPost)
            .then(data => {
                res.send({
                    status: 200,
                    msg: 'successfully',
                    data: data
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