const en = require("../translation/course/en.json")
const pl = require("../translation/course/pl.json")

const CoursePageCreator = ({ createPage, makeComponent }) => ({
  layout,
  lang,
  course,
}) => {
  const translation = {
    en,
    pl,
  }

  const {
    ga_page,
    url,
    mdate,
    cdate,
    status,
    title,
    tags,
    technologies,
    description,
    author,
    tech_reviewer,
    thumbnail,
    ling_reviewer,
    chapters,
  } = course

  const courseChapters = chapters.map(chapter => ({
    duration: chapter.lessons
      .filter(({ deprecated }) => !deprecated)
      .reduce((acc, { duration }) => acc + duration, 0),
    title: chapter.title,
    lessons: chapter.lessons
      .filter(({ deprecated }) => !deprecated)
      .map(lesson => ({
        title: lesson.title,
        duration: lesson.duration,
        path: lesson.path,
      })),
  }))
  const lessons_count = chapters.reduce((acc, chapter) => {
    return acc + chapter.lessons.filter(({ deprecated }) => !deprecated).length
  }, 0)

  const context = {
    course: {
      t: translation[lang],
      ga_page,
      url,
      mdate,
      thumbnail: thumbnail.full,
      chapters: courseChapters,
      cdate,
      status,
      title,
      lessons_count,
      tags,
      description,
      technologies,
      duration: chapters.reduce(
        (totalAcc, chapter) =>
          totalAcc +
          chapter.lessons
            .filter(({ deprecated }) => !deprecated)
            .reduce((acc, { duration }) => acc + duration, 0),
        0
      ),
      author: {
        ...author,
        avatar: {
          medium: author.avatar.medium,
          small: author.avatar.small,
        },
      },
      tech_reviewer: {
        ...tech_reviewer,
        avatar: {
          small: tech_reviewer.avatar.small,
        },
      },
      ling_reviewer: {
        ...ling_reviewer,
        avatar: {
          small: ling_reviewer.avatar.small,
        },
      },
    },
    layout,
  }

  createPage({
    path: course.path,
    component: makeComponent(),
    context,
  })
}

module.exports = {
  CoursePageCreator,
}
