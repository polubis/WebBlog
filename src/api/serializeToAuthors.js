const { findAvatar } = require("./findAvatar")

exports.serializeToAuthors = ({ authors, authorsAvatars }) => {
  return authors.map(author => ({
    ...author,
    avatar: findAvatar(authorsAvatars, author.id),
  }))
}
