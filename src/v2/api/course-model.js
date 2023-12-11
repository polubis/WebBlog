const { createUser } = require("./createUser")

const getLessonIdFromSlug = slug => {
  return +slug.split("/").pop()
}

const getLessonThumbnail = (thumbnails, lessonSlug) => {
  const lessonId = lessonSlug + ".jpg"
  return thumbnails.find(({ relativePath }) => {
    return relativePath === lessonId
  })
}

const CourseModel = (
  { slug, frontmatter },
  {
    coursesThumbnails,
    lessonsThumbnails,
    authors,
    authorsAvatars,
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
    seniorityLevel,
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
  const coursePath = path + courseId + "/"
  const courseChapters = chapters.filter(chapter => {
    const chapterCourseId = chapter.slug.split("/")[0]
    return courseId === chapterCourseId
  })

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

  return {
    title: name,
    description,
    lessons_count: courseLessons.length,
    status,
    cdate,
    mdate,
    stack,
    seniority: seniorityLevel,
    duration,
    ga_page: ga_page + "/" + courseId,
    url: layout.site_url + coursePath,
    tags: tags.split(","),
    path: coursePath,
    thumbnail: {
      medium: thumbnail.medium.fixed,
      full: thumbnail.full.fluid,
    },
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
        const courseChapterSlugParts = chapter.slug.split("/")
        const courseChapterId =
          courseChapterSlugParts[0] + "/" + courseChapterSlugParts[1]
        const chapterTitle = chapter.frontmatter.name
        const chapterLessons = courseLessons.filter(lesson => {
          const lessonSlugParts = lesson.slug.split("/")
          const lessonId = lessonSlugParts[0] + "/" + lessonSlugParts[1]

          return lessonId === courseChapterId
        })
        let chapterLessonsCollection = chapterLessons
          .sort((prev, curr) => {
            const prevLessonIdAsNumber = getLessonIdFromSlug(prev.slug)
            const nextLessonIdAsNumber = getLessonIdFromSlug(curr.slug)

            if (prevLessonIdAsNumber > nextLessonIdAsNumber) return 1
            if (prevLessonIdAsNumber === nextLessonIdAsNumber) return 0
            return -1
          })
          .map(lesson => {
            const lessonThumbnail =
              getLessonThumbnail(lessonsThumbnails, lesson.slug) ?? thumbnail

            return {
              title: lesson.frontmatter.name,
              duration: lesson.frontmatter.duration,
              slug: lesson.slug,
              thumbnail: {
                medium: lessonThumbnail.medium.fixed,
                full: lessonThumbnail.full.fluid,
              },
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
              source_url:
                layout.course_source_url + path + lesson.slug + ".mdx",
              path:
                coursePath +
                titleToSlug(chapterTitle) +
                "/" +
                titleToSlug(lesson.frontmatter.name) +
                "/",
            }
          })
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
