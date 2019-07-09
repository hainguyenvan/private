const getAllPost = `
{
  getAllPost {
    id
    title
    authorDetail {
      id
      name
    }
  }
}`;

module.exports = {
    getAllPost
}