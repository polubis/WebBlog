const { getArticlesQuery } = require("./getArticlesQuery")
const { serializeToAuthors } = require("./serializeToAuthors")
const { getCoursesQuery } = require("./getCoursesQuery")
const { getTranslatedArticles } = require("./getTranslatedArticles")
const { addDays, differenceInDays, format } = require("date-fns")

const getTimeline = ({ articles, courses }) => {
  const data = [
    ...articles.map(article => ({
      createdAt: article.createdAt,
      title: article.title,
      avatar: article.thumbnail,
      url: article.path,
    })),
    ...courses.map(course => ({
      createdAt: course.createdAt,
      title: course.name,
      avatar: course.thumbnail,
      url: course.path,
    })),
  ]
    .sort((a, b) => {
      if (a.createdAt < b.createdAt) return 1
      if (a.createdAt === b.createdAt) return 0
      return -1
    })
    .slice(0, 12)

  const timelineData = []
  const GAP = 5
  const firstArticleDate = new Date(data[0].createdAt)
  const fromDate = addDays(firstArticleDate, -GAP)
  const toDate = addDays(new Date(data[data.length - 1].createdAt), GAP)

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
    const { createdAt, avatar, title, url } = data[i]
    const date = new Date(createdAt)

    timelineData.push({
      top,
      date: format(new Date(createdAt), "dd/MM/yyyy"),
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
        ? Math.abs(differenceInDays(date, new Date(nextNode.createdAt)))
        : GAP) / 3

    for (let j = 0; j < diffToNextDate; j++) {
      timelineData.push({
        date: format(addDays(date, j + 1), "dd/MM/yyyy"),
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

exports.getAllDataQuery = data => {
  const site = data.site.siteMetadata
  const translationObject = data.translationObject
  const articles = getArticlesQuery(data)
  const authors = serializeToAuthors(data)
  const courses = getCoursesQuery(data)
  const totalLessons = courses.reduce(
    (sum, course) => sum + course.lessonsCount,
    0
  )
  const timeline = getTimeline({ articles, courses })
  const animalsAvatars = data.animalsAvatars.nodes.map(node => ({
    name: node.relativePath.split("/").pop().split(".")[0],
    fluid: node.childImageSharp.fluid,
  }))
  const translatedArticles = getTranslatedArticles(data)

  return {
    articles,
    authors,
    courses,
    translatedArticles,
    totalLessons,
    animalsAvatars,
    timeline,
    site,
    translationObject,
  }
}
