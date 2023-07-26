const { createUser } = require("./createUser")

const CourseModel = (
  { slug, frontmatter },
  { coursesThumbnails, authors, authorsAvatars, path, lessons }
) => {
  const {
    name,
    description,
    status,
    tags,
    cdate,
    mdate,
    stack,
    authorId,
    treviewerId,
    lreviewerId,
  } = frontmatter

  const courseId = slug.split("/")[0]
  const thumbnail = coursesThumbnails.find(
    ({ relativePath }) => relativePath.split("/")[0] === courseId
  )

  if (!thumbnail) {
    throw Error("Cannot find thumbnail for course: " + name)
  }

  const author = createUser(authorId, authors, authorsAvatars)
  const tech_reviewer = createUser(treviewerId, authors, authorsAvatars)
  const ling_reviewer = createUser(lreviewerId, authors, authorsAvatars)
  const courseLessons = lessons.filter(
    lesson => lesson.slug.split("/")[0] === courseId
  )
  const duration = courseLessons.reduce(
    (acc, { frontmatter: { duration } }) => duration + acc,
    0
  )

  return {
    title: name,
    description,
    status,
    cdate,
    mdate,
    duration,
    tags: tags.split(","),
    path: path + courseId + "/",
    thumbnail: {
      medium: thumbnail.medium.fixed,
      full: thumbnail.full.fluid,
    },
    stack: stack.split(","),
    author,
    tech_reviewer,
    ling_reviewer,
  }
}

module.exports = {
  CourseModel,
}
