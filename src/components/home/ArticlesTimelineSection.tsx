import React from "react"
import styled from "styled-components"
import { Timeline, TimelineData } from "../timeline"
import { HomeProps } from "./models"
import { addDays, differenceInDays } from "date-fns"
import { DEFAULT_SETUP } from "../timeline/setup"

const Container = styled.section``

export const ArticlesTimelineSection = ({ data }: HomeProps) => {
  const getSlug = relativePath => {
    const parts = relativePath.split("/")
    const filtered = parts.filter((_, i) => i !== 0 && i < parts.length - 1)
    return `${filtered.join("/")}/`
  }

  const thumbnails = data.thumbnails.nodes.reduce((acc, node) => {
    return {
      ...acc,
      [getSlug(node.relativePath)]: node.childImageSharp.fluid,
    }
  }, {})

  const articles = data.articles.nodes
    .sort((a, b) => {
      if (a.frontmatter.cdate > b.frontmatter.cdate) {
        return 1
      }

      if (a.frontmatter.cdate === b.frontmatter.cdate) {
        return 0
      }

      return -1
    })
    .map((node, idx) => ({
      slug: node.slug,
      frontmatter: node.frontmatter,
      isNew: idx === 0,
    }))

  const timelineData: TimelineData = []
  const GAP = 5
  const firstArticleDate = new Date(articles[0].frontmatter.cdate)
  const fromDate = addDays(firstArticleDate, -GAP)
  const toDate = addDays(
    new Date(articles[articles.length - 1].frontmatter.cdate),
    GAP
  )

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
    const date = new Date(articles[i].frontmatter.cdate)

    timelineData.push({
      top,
      date: new Date(articles[i].frontmatter.cdate),
      displayed: true,
      empty: false,
      blank: false,
      items: [
        {
          avatar: thumbnails[articles[i].slug],
          title: articles[i].frontmatter.title,
          url: articles[i].slug,
        },
      ],
    })

    const nextArticle = articles[i + 1]

    if (!nextArticle) {
      break
    }

    const diffToNextDate =
      (nextArticle
        ? Math.abs(
            differenceInDays(date, new Date(nextArticle.frontmatter.cdate))
          )
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

  return (
    <Container>
      <Timeline
        data={timelineData}
        setup={{
          ...DEFAULT_SETUP,
          padding: "44px 0 22px 0",
        }}
      />
    </Container>
  )
}
