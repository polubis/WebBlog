const en = require("../translation/article/en.json")
const pl = require("../translation/article/pl.json")

const LessonPageCreator = ({ createPage, makeComponent }) => ({
  layout,
  lang,
  lesson,
  course,
  chapter,
  nextChapter,
  prevChapter,
  rates,
  votes,
}) => {
  const translation = {
    en,
    pl,
  }

  const {
    title,
    body,
    source_url,
    next,
    prev,
    description,
    url,
    path,
    slug,
  } = lesson

  const firebasePathParts = path.replace(/\//g, "-").split("-")
  firebasePathParts.pop()
  firebasePathParts.shift()
  const fireBasePath = firebasePathParts.join("-")

  createPage({
    path: lesson.path,
    component: makeComponent(),
    context: {
      article: {
        course: {
          path: course.path,
          title: course.title,
          seniority: course.seniority,
          tags: course.tags,
        },
        chapters: course.chapters.map(chapter => ({
          duration: chapter.lessons.reduce(
            (acc, { duration }) => acc + duration,
            0
          ),
          title: chapter.title,
          lessons: chapter.lessons.map(lesson => ({
            title: lesson.title,
            duration: lesson.duration,
            path: lesson.path,
          })),
        })),
        chapter: {
          title: chapter.title,
        },
        comments: {
          is: "idle",
        },
        rate: rates[fireBasePath],
        vote: {
          is: "idle",
          vote: votes[fireBasePath] ?? { positive: 0, negative: 0 },
        },
        slug,
        resourcePath: fireBasePath,
        author: course.author,
        tech_reviewer: course.tech_reviewer,
        ling_reviewer: course.ling_reviewer,
        t: translation[lang],
        ga_page: lesson.ga_page,
        url,
        title,
        source_url,
        lang,
        path,
        duration: lesson.duration,
        description,
        body,
        cdate: course.cdate,
        mdate: course.mdate,
        tags: course.tags,
        seniority: course.seniority,
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
        thumbnail: lesson.thumbnail,
      },

      layout,
    },
  })
}

module.exports = {
  LessonPageCreator,
}
