const PostModel = require('../../../models/post');
const AccountModel = require('../../../models/account');

const Post = {
    authorDetail(root) {
        let authorID = root.id;
        return AccountModel.getByID(authorID)
            .then(data => {
                return data;
            })
            .catch(err => {
                return {};
            })
    }
}


const Query = {
    getAllPost(root, args, context, info) {
        return PostModel.getAll()
            .then(dataList => {
                return dataList;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    },
}


module.exports = {
    Query,
    Post
}