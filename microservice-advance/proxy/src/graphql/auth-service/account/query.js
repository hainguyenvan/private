const getAccountByID = id => {
    return `
        {
            getAccountsById(id: "${id}") {
            status
            msg
            account {
                id
                email
                timeCreated
                timeModified
            }
            }
        }`;
};

module.exports = {
    getAccountByID,
};