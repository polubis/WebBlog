const en = require("../translation/home/en.json")
const pl = require("../translation/home/pl.json")
const { createUser } = require("./createUser")
const { addDays, differenceInDays, format } = require("date-fns")
const { REFACTOR_SAMPLE_EN } = require("./refactor-sample-en")
const { REFACTOR_SAMPLE_PL } = require("./refactor-sample-pl")

const getTimeline = ({ articles, courses }) => {
  const data = [
    ...articles.map(article => ({
      date: article.cdate,
      title: article.title,
      avatar: article.thumbnail.medium,
      url: article.path,
    })),
    ...courses.map(course => ({
      date: course.cdate,
      title: course.title,
      avatar: course.thumbnail.medium,
      url: course.path,
    })),
  ]
    .sort((a, b) => {
      if (a.date < b.date) return 1
      if (a.date === b.date) return 0
      return -1
    })
    .slice(0, 16)

  const timelineData = []
  const GAP = 5
  const firstArticleDate = new Date(data[0].date)
  const fromDate = addDays(firstArticleDate, -GAP)
  const toDate = addDays(new Date(data[data.length - 1].date), GAP)

  let top = true

  for (let i = 0; i < GAP; i++) {
    timelineData.push({
      date: addDays(fromDate, i),
      top: false,
      displayed: false,
      empty: true,
      blank: i === 0,
      items: [],
    })
  }

  for (let i = 0; i < data.length; i++) {
    const { date, avatar, title, url } = data[i]
    const fromDate = new Date(date)

    timelineData.push({
      top,
      date: format(new Date(date), "dd/MM/yyyy"),
      displayed: true,
      empty: false,
      blank: false,
      items: [
        {
          avatar,
          title,
          url,
        },
      ],
    })

    const nextNode = data[i + 1]

    if (!nextNode) {
      break
    }

    const diffToNextDate =
      (nextNode
        ? Math.abs(differenceInDays(fromDate, new Date(nextNode.date)))
        : GAP) / 3

    for (let j = 0; j < diffToNextDate; j++) {
      timelineData.push({
        date: format(addDays(fromDate, j + 1), "dd/MM/yyyy"),
        top: false,
        displayed: false,
        empty: true,
        blank: false,
        items: [],
      })
    }

    top = !top
  }

  for (let i = 0; i < GAP; i++) {
    timelineData.push({
      date: format(addDays(toDate, i + 1), "dd/MM/yyyy"),
      top: false,
      displayed: false,
      empty: true,
      blank: i === GAP - 1,
      items: [],
    })
  }

  return timelineData
}
const HomePageCreator = ({ createPage, makeComponent }) => ({
  ga_page,
  path,
  layout,
  lang,
  articles,
  courses,
  authorsAvatars,
  authors,
  homePageThumbnail,
  technologiesAvatars,
  studentsCount,
  devsCount,
}) => {
  const translation = {
    en,
    pl,
  }
  const showcase_frames = {
    en: [...REFACTOR_SAMPLE_EN],
    pl: [...REFACTOR_SAMPLE_PL],
  }

  createPage({
    path,
    component: makeComponent(),
    context: {
      home: {
        t: translation[lang],
        ga_page,
        url: layout.site_url + path,
        articles_count: articles.length,
        authors_count: authors.length,
        courses_count: courses.length,
        students_count: studentsCount,
        showcase_frames: showcase_frames[lang],
        lessons_count: courses.reduce((acc, course) => {
          const lessonsCount = course.chapters.reduce(
            (lessonsAcc, chapter) =>
              lessonsAcc +
              chapter.lessons.filter(({ deprecated }) => !deprecated).length,
            0
          )
          return acc + lessonsCount
        }, 0),
        technologies_count: technologiesAvatars.length,
        devs_count: devsCount,
        topics_count: courses.reduce(
          (acc, course) => acc + course.chapters.length,
          0
        ),
        random_user_avatar: createUser(authors[0].id, authors, authorsAvatars)
          .avatar.big,
        thumbnail: homePageThumbnail,
        timeline: getTimeline({ articles, courses }),
      },
      layout,
    },
  })
}

module.exports = {
  HomePageCreator,
}
