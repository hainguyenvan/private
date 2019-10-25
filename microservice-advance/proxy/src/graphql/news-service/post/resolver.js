const AccountService = require('../../auth-service/account/service');

const PostType = {
    async accountInfo(root, args, context, info) {
        if (root.createdBy === undefined || root.createdBy === null) {
            return null;
        }

        const createdBy = root.createdBy.id;
        const apiKey = 'test101';
        return AccountService.getByID(createdBy, apiKey)
            .then(acc => {
                return acc;
            })
            .catch(err => {
                console.log(err);
                return null;
            });
    },
};

module.exports = {
    PostType,
};