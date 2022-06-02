import React, { useEffect, useLayoutEffect, useState } from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader"
import styled, { keyframes } from "styled-components"

import Layout from "../layout/Layout"
import { Article as ArticleModel } from "../../models/Article"
import Thumbnail from "../article/Thumbnail"
import Tags from "../article/Tags"
import { M } from "../../ui"
import Details from "../article/Details"
import { AuthorBadge, ReadTimeBadge } from "../badges"
import Divider from "../article/Divider"
import Intro from "./Intro"
import { L_UP } from "../../utils/viewport"
import { SiteMeta } from "../../utils/SiteMeta"
import { isInSSR } from "../../utils/isInSSR"
import theme from "../../utils/theme"
import { toHMS } from "../../utils/toHMS"

deckDeckGoHighlightElement()

const Article = styled.main`
  display: flex;
  flex-flow: column;
  margin: 0 auto;
  padding: 48px 0;

  @media ${L_UP} {
    width: 920px;
  }

  & > :nth-child(2) {
    margin: 62px 0 28px 0;
  }

  ${Divider} {
    margin: 82px 0;
  }

  ${Details} {
    & > :nth-child(2) {
      margin: 0 28px 0 54px;
    }
  }
`

interface Props {
  pageContext: {
    article: ArticleModel
  }
}

const ReadProgress = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 4px;
  height: 100vh;
  transition: 0.3s height ease-in-out;
`

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-15px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const ReadTimeStats = styled.div`
  position: fixed;
  bottom: 0;
  left: 4px;
  padding: 4px 6px;
  background: ${theme.green};
  animation: ${slideIn} 0.4s ease-in-out 0s forwards;
  opacity: 0;
  max-width: 220px;
`

const TRESHOLDS = [
  [60, "Don't scroll, just read it 🐼"] as const,
  [180, "Well, let me believe you've read it 🐍"] as const,
  [240, "Holy cow, did you really read this? Thanks! 🤓"] as const,
] as const

const ReadStatsManager = ({ readedIn }: { readedIn: number }) => {
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (readedIn > 0) {
      const appearTimeout = setTimeout(() => {
        const [, messageToSet] = TRESHOLDS.find(
          ([treshold]) => readedIn <= treshold
        )!
        setMessage(messageToSet)
      }, 2000)
      return () => {
        clearTimeout(appearTimeout)
      }
    }
  }, [readedIn])

  if (readedIn === 0) {
    return null
  }

  if (readedIn > 0) {
    return (
      <>
        {message === "" ? (
          <ReadTimeStats>{toHMS(readedIn)}</ReadTimeStats>
        ) : (
          <ReadTimeStats>{message}</ReadTimeStats>
        )}
      </>
    )
  }
}

export default function ({ pageContext }: Props): React.ReactElement {
  const [readedIn, setReadedIn] = useState(0)
  const [progress, setProgress] = useState(0)

  const {
    article: { frontmatter, author, thumbnail, body, slug },
  } = pageContext

  const { title, description, tags, readTime } = frontmatter

  const pageTitle = `${title} | by ${author.firstName} ${author.lastName} | GreenOn Software`

  useLayoutEffect(() => {
    if (!isInSSR() && !!window.IntersectionObserver) {
      let jump = 0
      window.scrollY = 0
      let h2sCount = 0
      let counter = 0

      let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (counter === h2sCount - 1) {
              setReadedIn(entry.time / 1000)
            }
            setProgress(prevProgress => prevProgress + jump)
            observer.unobserve(entry.target)
            counter++
          }
        })
      })

      const h2s = document.querySelectorAll(`section h2`)
      h2sCount = h2s.length
      jump = (1 / h2s.length) * 100

      h2s.forEach(h2 => {
        observer.observe(h2)
      })
    }
  }, [])

  return (
    <SiteMeta
      url={`/articles/${slug}`}
      robots="index,follow,max-image-preview:large"
      title={pageTitle}
      type="article"
      author={author.firstName + " " + author.lastName}
      description={description}
      image={thumbnail.src}
    >
      <Layout>
        <Article>
          <Thumbnail
            thumbnail={thumbnail}
            title={title}
            cdate={frontmatter.cdate}
            mdate={frontmatter.mdate}
          />
          <Tags tags={tags} />
          <Intro>
            <M>{description}</M>
          </Intro>
          <Details>
            <AuthorBadge author={author} />
            <ReadTimeBadge minutes={readTime} />
          </Details>
          <Divider />
          <MDXRenderer>{body}</MDXRenderer>
        </Article>
        <ReadProgress
          style={{
            height: progress + "%",
            background: progress >= 100 ? theme.green : theme.primary,
          }}
        />
        <ReadStatsManager readedIn={readedIn} />
      </Layout>
    </SiteMeta>
  )
}
