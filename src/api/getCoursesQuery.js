const getChapterIdFromSlug = slug => {
  const [, id] = slug.split("/")
  return id
}
const getCourseNameFromSlug = slug => {
  const [name] = slug.split("/")
  return name
}
const getLessonIdFromSlug = slug => {
  return slug.split("/")[3]
}

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

exports.getCoursesQuery = data => {
  const lessonsByChapterId = data.lessons.nodes.reduce(
    (acc, { slug, frontmatter }) => {
      const chapterId = getChapterIdFromSlug(slug)
      const lessonId = getLessonIdFromSlug(slug)
      const lessonToAdd = {
        id: lessonId,
        slug,
        duration: frontmatter.duration,
        name: frontmatter.name,
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

  const chapters = sortById(
    data.chapters.nodes.map(({ frontmatter, slug }) => {
      const chapterId = getChapterIdFromSlug(slug)
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
    const name = getCourseNameFromSlug(chapter.slug)

    if (Array.isArray(acc[name]) && acc[name].length > 0) {
      acc[name].push(chapter)
      return acc
    }

    return {
      ...acc,
      [name]: [chapter],
    }
  }, {})

  const authorsObj = data.authors.reduce(
    (acc, author) => ({
      ...acc,
      [author.name]: author,
    }),
    {}
  )
  const avatarsObj = data.avatars.nodes.reduce(
    (acc, avatar) => ({
      ...acc,
      [avatar.name]: avatar.childImageSharp.fluid,
    }),
    {}
  )
  const techAvatarsObj = data.techAvatars.nodes.reduce((acc, node) => {
    return {
      ...acc,
      [node.name]: node.childImageSharp.fluid,
    }
  }, {})

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

    const chapters = chaptersByCourseName[getCourseNameFromSlug(slug)]
    const duration = chapters.reduce(
      (acc, chapter) => acc + chapter.duration,
      0
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
      techReviewer,
      lingReviewer,
      path,
      chapters: chapters.map(chapter => ({
        ...chapter,
        path: `${path}${chapter.id}/`,
        lessons: chapter.lessons.map(lesson => ({
          ...lesson,
          path: `${path}${chapter.id}/${lesson.id}/`,
        })),
      })),
    }
  })
}
