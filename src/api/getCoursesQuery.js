const { getTechAvatarsMap } = require("./getTechAvatarsMap")
const { removeEdgeSlashes } = require("./removeEdgeSlashes")

const createUser = (json, avatarsObject) => ({
  firstName: json.firstName,
  lastName: json.lastName,
  id: json.id,
  role: json.role,
  avatar: avatarsObject[json.id],
})
const sortById = items => {
  return items.sort((a, b) => {
    if (a.id > b.id) {
      return 1
    }

    if (a.id === b.id) {
      return 0
    }

    return -1
  })
}

const toDashed = str => {
  let kebabCase = str
    .replace(/([A-Z])/g, "-$1")
    .replace(/ /g, "-")
    .toLowerCase()

  if (kebabCase.charAt(0) === "-") {
    kebabCase = kebabCase.slice(1, kebabCase.length)
  }

  return kebabCase
}

exports.getCoursesQuery = data => {
  const lessonsByChapterId = data.lessons.nodes.reduce(
    (acc, { slug, body, rawBody, frontmatter }) => {
      const chapterId = [slug.split("/")[0], slug.split("/")[1]].join("/")
      const lessonId = slug
      const lessonToAdd = {
        id: lessonId,
        slug,
        duration: frontmatter.duration,
        name: frontmatter.name,
        body,
        rawBody,
        description: frontmatter.description,
      }

      if (Array.isArray(acc[chapterId]) && acc[chapterId].length > 0) {
        acc[chapterId].push(lessonToAdd)
        return acc
      }

      return {
        ...acc,
        [chapterId]: [lessonToAdd],
      }
    },
    {}
  )

  let chapters = sortById(
    data.chapters.nodes.map(({ frontmatter, slug }) => {
      const chapterId = [slug.split("/")[0], slug.split("/")[1]].join("/")
      const lessons = lessonsByChapterId[chapterId]
      const chapterToAdd = {
        id: chapterId,
        slug,
        name: frontmatter.name,
        lessons: sortById(lessons),
        duration: lessons.reduce((acc, lesson) => lesson.duration + acc, 0),
      }

      return chapterToAdd
    })
  )

  const chaptersByCourseName = chapters.reduce((acc, chapter) => {
    const courseId = chapter.slug.split("/")[0]

    if (Array.isArray(acc[courseId]) && acc[courseId].length > 0) {
      acc[courseId].push(chapter)
      return acc
    }

    return {
      ...acc,
      [courseId]: [chapter],
    }
  }, {})

  const authorsObj = data.authors.reduce(
    (acc, author) => ({
      ...acc,
      [author.name]: author,
    }),
    {}
  )
  const avatarsObj = data.authorsAvatars.nodes.reduce(
    (acc, avatar) => ({
      ...acc,
      [avatar.name]: avatar,
    }),
    {}
  )
  const techAvatarsObj = getTechAvatarsMap(data.technologiesAvatars)

  return data.courses.nodes.map(({ slug, frontmatter }) => {
    const [folderName] = slug.split("/")
    const author = createUser(authorsObj[frontmatter.authorId], avatarsObj)
    const techReviewer = createUser(
      authorsObj[frontmatter.treviewerId],
      avatarsObj
    )
    const lingReviewer = createUser(
      authorsObj[frontmatter.lreviewerId],
      avatarsObj
    )
    const path = `/courses/${folderName}/`

    const chapters = chaptersByCourseName[folderName]
    const duration = chapters.reduce(
      (acc, chapter) => acc + chapter.duration,
      0
    )
    const finalChapters = chapters.map(chapter => {
      const chapterPath = `${path}${toDashed(chapter.name)}/`

      return {
        ...chapter,
        path: chapterPath,
        gaPage: removeEdgeSlashes(chapterPath),
        lessons: chapter.lessons.map(lesson => {
          const lessonPath = `${path}${toDashed(chapter.name)}/${toDashed(
            lesson.name
          )}/`
          return {
            ...lesson,
            path: lessonPath,
            gaPage: removeEdgeSlashes(lessonPath),
          }
        }),
      }
    })
    const fullChapters = finalChapters.map(
      (chapter, chapterIdx, chaptersArr) => {
        return {
          ...chapter,
          lessons: chapter.lessons.map((lesson, lessonIdx, lessonsArr) => {
            const finalLesson = {
              ...lesson,
              nextLesson: lessonsArr[lessonIdx + 1]
                ? lessonsArr[lessonIdx + 1]
                : undefined,
              prevLesson: lessonsArr[lessonIdx - 1]
                ? lessonsArr[lessonIdx - 1]
                : undefined,
            }

            if (!finalLesson.nextLesson) {
              const nextChapter = chaptersArr[chapterIdx + 1]

              if (nextChapter) {
                const firstLesson = nextChapter.lessons[0]

                if (firstLesson) {
                  finalLesson.nextLesson = nextChapter.lessons[0]
                }
              }
            }

            if (!finalLesson.prevLesson) {
              const prevChapter = chaptersArr[chapterIdx - 1]

              if (prevChapter) {
                const lastLesson =
                  prevChapter.lessons[prevChapter.lessons.length - 1]

                if (lastLesson) {
                  finalLesson.prevLesson = lastLesson
                }
              }
            }

            return finalLesson
          }),
        }
      }
    )

    return {
      id: folderName,
      createdAt: frontmatter.cdate,
      modifiedAt: frontmatter.mdate,
      name: frontmatter.name,
      duration,
      description: frontmatter.description,
      status: frontmatter.status,
      author,
      stack: frontmatter.stack.split(",").map(id => ({
        id,
        avatar: techAvatarsObj[id],
      })),
      gaPage: removeEdgeSlashes(path),
      techReviewer,
      lingReviewer,
      path,
      chapters: fullChapters,
      lessonsCount: chapters.reduce(
        (acc, chapter) => acc + chapter.lessons.length,
        0
      ),
      thumbnail: data.coursesThumbnails.nodes.find(node => {
        const id = node.relativePath.split("/")[0]
        return id === folderName
      }).childImageSharp.fluid,
    }
  })
}
