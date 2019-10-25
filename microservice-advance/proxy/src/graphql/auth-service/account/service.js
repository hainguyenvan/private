const { getAccountByID } = require('./query');
const AuthServiceGraphQLClient = require('../graphql-client');

class AccountService {
    getByID(id, xapiKey) {
        return new Promise((resolve, reject) => {
            try {
                const gql = getAccountByID(id);
                AuthServiceGraphQLClient.request(gql, xapiKey)
                    .then(data => {
                        if (data.getAccountsById === undefined || data.getAccountsById.status !== 200) {
                            reject(err);
                        }
                        const acc = data.getAccountsById.account;
                        resolve(acc);
                    })
                    .catch(err => {
                        reject(err);
                    });
            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = new AccountService();