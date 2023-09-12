const en = require("../translation/lesson/en.json")
const pl = require("../translation/lesson/pl.json")

const LessonPageCreator = ({ createPage, makeComponent }) => ({
  layout,
  lang,
  lesson,
  course,
  chapter,
  nextChapter,
  prevChapter,
}) => {
  const translation = {
    en,
    pl,
  }

  const { title, body, source_url, next, prev, description, url } = lesson

  createPage({
    path: lesson.path,
    component: makeComponent(),
    context: {
      lesson: {
        t: translation[lang],
        ga_page: lesson.ga_page,
        url,
        title,
        duration: lesson.duration,
        source_url,
        description,
        body,
        prev: prev
          ? { path: prev.path }
          : prevChapter?.lessons[prevChapter?.lessons.length - 1]
          ? { path: prevChapter?.lessons[prevChapter?.lessons.length - 1].path }
          : undefined,
        next: next
          ? { path: next.path }
          : nextChapter?.lessons[0]
          ? { path: nextChapter?.lessons[0].path }
          : undefined,
        course: {
          path: course.path,
          title: course.title,
        },
        chapter: {
          title: chapter.title,
        },
        thumbnail: lesson.thumbnail,
        chapters: course.chapters.map(chapter => ({
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
        })),
      },
      layout,
    },
  })
}

module.exports = {
  LessonPageCreator,
}
