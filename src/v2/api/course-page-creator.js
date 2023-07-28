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
    duration,
    lessons_count,
    description,
    author,
    tech_reviewer,
    thumbnail,
    ling_reviewer,
    chapters,
  } = course

  createPage({
    path: course.path,
    component: makeComponent(),
    context: {
      course: {
        t: translation[lang],
        ga_page,
        url,
        mdate,
        thumbnail: thumbnail.full,
        chapters: chapters.map(chapter => ({
          duration: chapter.duration,
          title: chapter.title,
          lessons: chapter.lessons.map(lesson => ({
            title: lesson.title,
            duration: lesson.duration,
            path: lesson.path,
          })),
        })),
        cdate,
        status,
        title,
        lessons_count,
        tags,
        description,
        technologies,
        duration,
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
    },
  })
}

module.exports = {
  CoursePageCreator,
}
