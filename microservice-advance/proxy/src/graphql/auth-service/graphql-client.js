const { GraphQLClient } = require('graphql-request');

const Constant = require('../../const/constant');

class AuthServiceGQLClient {
    constructor() {
        this.graphQLClient = new GraphQLClient(Constant.AUTH_GRAPHQL_API_URL, {
            headers: {},
        });
    }

    request(query, apiKey) {
        return new Promise(async(fulfill, reject) => {
            this.graphQLClient.options.headers.xapikey = apiKey;
            this.graphQLClient
                .request(query)
                .then(data => {
                    fulfill(data);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
}

module.exports = new AuthServiceGQLClient();