const getAllUser = `
{
    getAllAccount {
      id
      roleDetail {
        id
        name
      }
    }
  }`;

const getUserByID = function(id) {
    let gql = `
    {
      getAccountByID(id: ${id}) {
        id
      }
    }
    `;
    return gql;
}

module.exports = {
    getAllUser,
    getUserByID
}