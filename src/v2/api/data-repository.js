const authors = require("../../authors/authors.json")
const fetch = require("node-fetch")

const DataRepository = async result => {
  const authorsAvatars = result.data.authorsAvatars.nodes
  const lessons = result.data.lessons.nodes
  const coursesThumbnails = result.data.coursesImages.nodes
  const technologiesAvatars = result.data.technologiesAvatars.nodes
  const chapters = result.data.chapters.nodes
  const courses = result.data.courses.nodes
  const homePageThumbnail =
    result.data.blackHoleImg.nodes[0].childImageSharp.fluid

  const discordMembersResult = await fetch(
    `https://discord.com/api/v9/invites/PxXQayT3x3?with_counts=true`
  )
  const discordMembersData = await discordMembersResult.json()

  const githubContributorsResult = await fetch(
    `https://api.github.com/repos/polubis/WebBlog/contributors`
  )
  const githubContributorsData = await githubContributorsResult.json()

  return {
    authorsAvatars,
    lessons,
    coursesThumbnails,
    technologiesAvatars,
    chapters,
    courses,
    authors,
    homePageThumbnail,
    studentsCount: discordMembersData.approximate_member_count,
    devsCount: githubContributorsData.length,
  }
}

module.exports = {
  DataRepository,
}
