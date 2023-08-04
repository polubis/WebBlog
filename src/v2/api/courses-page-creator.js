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
          ({ title, description, status, tags, path, chapters }) => ({
            title,
            description,
            status,
            duration: chapters.reduce(
              (totalAcc, chapter) =>
                totalAcc +
                chapter.lessons
                  .filter(({ deprecated }) => !deprecated)
                  .reduce((acc, { duration }) => acc + duration, 0),
              0
            ),
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
