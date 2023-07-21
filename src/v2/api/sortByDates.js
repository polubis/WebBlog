const sortByDates = items => {
  return items.sort((a, b) => {
    if (a.frontmatter.cdate > b.frontmatter.cdate) {
      return -1
    }

    if (a.frontmatter.cdate === b.frontmatter.cdate) {
      return 0
    }

    return 1
  })
}

module.exports = {
  sortByDates,
}
