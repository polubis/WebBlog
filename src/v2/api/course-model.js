const { createTechnologies } = require("./createTechnologies")
const { createUser } = require("./createUser")

const getCourseId = slug => {
  return slug.split("/")[0]
}

const getLessonId = slug => {
  const parts = slug.split("/")
  const id = parts[0] + "/" + parts[1]

  return id
}

const getChapterId = slug => {
  const parts = slug.split("/")
  const id = parts[0] + "/" + parts[1]

  return id
}

const getLessonThumbnail = (thumbnails, courseId, chapterId, lessonId) => {
  const thumbnail = thumbnails.find(({ relativePath }) => {
    return (
      courseId === getCourseId(relativePath) &&
      chapterId === getChapterId(relativePath) &&
      lessonId === getLessonId(relativePath).split(".")[0]
    )
  })

  return thumbnail
}

const CourseModel = (
  { slug, frontmatter },
  {
    coursesThumbnails,
    lessonsThumbnails,
    authors,
    authorsAvatars,
    technologiesAvatars,
    path,
    chapters,
    lessons,
    ga_page,
    layout,
  }
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

  const courseId = getCourseId(slug)
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
    lesson => getCourseId(lesson.slug) === courseId
  )
  const duration = courseLessons.reduce(
    (acc, { frontmatter: { duration } }) => duration + acc,
    0
  )
  const coursePath = path + courseId + "/"
  const courseChapters = chapters.filter(
    chapter => courseId === getCourseId(chapter.slug)
  )

  const titleToSlug = title => {
    let kebabCase = title
      .replace(/([A-Z])/g, "-$1")
      .replace(/ /g, "-")
      .replace(/--/g, "-")
      .toLowerCase()

    if (kebabCase.charAt(0) === "-") {
      kebabCase = kebabCase.slice(1, kebabCase.length)
    }

    return kebabCase
  }

  const getLessonOrCourseThumbnail = lessonThumbnail => {
    if (lessonThumbnail) {
      return lessonThumbnail.full.fluid
    }

    return thumbnail.full.fluid
  }

  return {
    title: name,
    description,
    lessons_count: courseLessons.length,
    status,
    cdate,
    mdate,
    duration,
    ga_page: ga_page + "/" + courseId,
    url: layout.site_url + coursePath,
    tags: tags.split(","),
    path: coursePath,
    thumbnail: {
      medium: thumbnail.medium.fixed,
      full: thumbnail.full.fluid,
    },
    technologies: createTechnologies(stack, technologiesAvatars),
    author,
    tech_reviewer,
    ling_reviewer,
    chapters: courseChapters
      .sort((prev, curr) => {
        if (prev.slug > curr.slug) return 1
        if (prev.slug === curr.slug) return 0
        return -1
      })
      .map(chapter => {
        const courseChapterId = getChapterId(chapter.slug)
        const chapterTitle = chapter.frontmatter.name
        const chapterLessons = courseLessons.filter(
          lesson => getLessonId(lesson.slug) === courseChapterId
        )
        let chapterLessonsCollection = chapterLessons
          .sort((prev, curr) => {
            if (prev.slug > curr.slug) return 1
            if (prev.slug === curr.slug) return 0
            return -1
          })
          .map(lesson => ({
            title: lesson.frontmatter.name,
            duration: lesson.frontmatter.duration,
            deprecated: lesson.frontmatter.deprecated,
            thumbnail: getLessonOrCourseThumbnail(
              getLessonThumbnail(
                lessonsThumbnails,
                courseId,
                courseChapterId,
                getLessonId(lesson.slug)
              )
            ),
            ga_page:
              ga_page +
              "/" +
              courseId +
              "/" +
              titleToSlug(chapterTitle) +
              "/" +
              titleToSlug(lesson.frontmatter.name),
            url:
              layout.site_url +
              coursePath +
              titleToSlug(chapterTitle) +
              "/" +
              titleToSlug(lesson.frontmatter.name) +
              "/",
            body: lesson.body,
            description: lesson.frontmatter.description,
            source_url: layout.course_source_url + path + lesson.slug + ".mdx",
            path:
              coursePath +
              titleToSlug(chapterTitle) +
              "/" +
              titleToSlug(lesson.frontmatter.name) +
              "/",
          }))
        chapterLessonsCollection = chapterLessonsCollection.map(
          (lesson, index) => ({
            ...lesson,
            prev: chapterLessonsCollection[index - 1],
            next: chapterLessonsCollection[index + 1],
          })
        )

        return {
          duration: chapterLessons.reduce(
            (acc, { frontmatter }) => acc + frontmatter.duration,
            0
          ),
          title: chapter.frontmatter.name,
          lessons: chapterLessonsCollection,
        }
      }),
  }
}

module.exports = {
  CourseModel,
}
