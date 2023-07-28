const { CourseModel } = require("./course-model")

const CoursesCollection = (dataRepository, layout, path, ga_page) => {
  return dataRepository.courses.map(course =>
    CourseModel(course, {
      ...dataRepository,
      layout,
      path,
      ga_page,
    })
  )
}

module.exports = {
  CoursesCollection,
}
