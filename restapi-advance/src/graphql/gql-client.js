const { GraphQLClient } = require('graphql-request');

const Config = require('../config/config');

class GQLClient {
    constructor() {
        this.graphQLClient = new GraphQLClient(Config.GRAPHQL_API, {
            headers: {
                authorization: 'Bearer MY_TOKEN',
            },
        })
    }

    request(query) {
        return new Promise(async(fulfill, reject) => {
            this.graphQLClient.request(query)
                .then(data => {
                    fulfill(data);
                })
                .catch(err => {
                    reject(err);
                })
        })

    }
}

module.exports = new GQLClient();