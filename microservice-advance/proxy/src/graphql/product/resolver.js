const Query = {
  getAllPosts(root, args, context, info) {
    return AgentController.getAll()
      .then(dataList => {
        return dataList;
      })
      .catch(errName => {
        throw new Error(errName);
      });
  }
};

module.exports = {
  Query
};
