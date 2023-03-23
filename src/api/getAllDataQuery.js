const { getArticlesQuery } = require("./getArticlesQuery")
const { serializeToAuthors } = require("./serializeToAuthors")
const { getCoursesQuery } = require("./getCoursesQuery")
const { addDays, differenceInDays } = require("date-fns")

const getTimeline = ({ articles }) => {
  const timelineData = []
  const GAP = 5
  const firstArticleDate = new Date(articles[0].createdAt)
  const fromDate = addDays(firstArticleDate, -GAP)
  const toDate = addDays(new Date(articles[articles.length - 1].createdAt), GAP)

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

  for (let i = 0; i < articles.length; i++) {
    const { createdAt, thumbnail, title, path } = articles[i]
    const date = new Date(createdAt)

    timelineData.push({
      top,
      date: new Date(createdAt),
      displayed: true,
      empty: false,
      blank: false,
      items: [
        {
          avatar: thumbnail,
          title,
          url: path,
        },
      ],
    })

    const nextArticle = articles[i + 1]

    if (!nextArticle) {
      break
    }

    const diffToNextDate =
      (nextArticle
        ? Math.abs(differenceInDays(date, new Date(nextArticle.createdAt)))
        : GAP) / 3

    for (let j = 0; j < diffToNextDate; j++) {
      timelineData.push({
        date: addDays(date, j + 1),
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
      date: addDays(toDate, i + 1),
      top: false,
      displayed: false,
      empty: true,
      blank: i === GAP - 1,
      items: [],
    })
  }

  return timelineData
}

exports.getAllDataQuery = data => {
  const articles = getArticlesQuery(data)
  const authors = serializeToAuthors(data)
  const courses = getCoursesQuery(data)
  const totalLessons = courses.reduce(
    (sum, course) => sum + course.lessonsCount,
    0
  )
  const timeline = getTimeline({ articles })

  return {
    articles,
    authors,
    courses,
    totalLessons,
    timeline,
  }
}
