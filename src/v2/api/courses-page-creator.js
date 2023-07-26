const en = require("../translation/courses/en.json")
const pl = require("../translation/courses/pl.json")

const CoursesPageCreator = ({
  createPage,
  makeComponent,
  ga_page,
  path,
}) => async ({ layout, lang, courses }) => {
  const translation = {
    en,
    pl,
  }

  createPage({
    path,
    component: makeComponent(),
    context: {
      courses: {
        t: translation[lang],
        ga_page,
        url: layout.site_url + path,
        courses: courses.map(
          ({ title, description, status, duration, tags, path }) => ({
            title,
            description,
            status,
            duration,
            tags,
            path,
          })
        ),
      },
      layout,
    },
  })
}

module.exports = {
  CoursesPageCreator,
}
