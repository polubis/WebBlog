const authors = require("../../authors/authors.json")

const DataRepository = result => {
  const authorsAvatars = result.data.authorsAvatars.nodes
  const lessons = result.data.lessons.nodes
  const coursesThumbnails = result.data.coursesImages.nodes
  const technologiesAvatars = result.data.technologiesAvatars.nodes
  const chapters = result.data.chapters.nodes
  const courses = result.data.courses.nodes

  return {
    authorsAvatars,
    lessons,
    coursesThumbnails,
    technologiesAvatars,
    chapters,
    courses,
    authors,
  }
}

module.exports = {
  DataRepository,
}
