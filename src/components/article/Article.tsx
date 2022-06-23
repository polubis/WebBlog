import React, { useEffect, useLayoutEffect, useState } from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled, { keyframes } from "styled-components"

import Layout from "../layout/Layout"
import { Article as ArticleModel } from "../../models/Article"
import Thumbnail from "../article/Thumbnail"
import Tags from "../article/Tags"
import { M } from "../../ui"
import Details from "../article/Details"
import { AuthorBadge, ReadTimeBadge } from "../badges"
import Intro from "./Intro"
import { L_UP } from "../../utils/viewport"
import { SiteMeta } from "../../utils/SiteMeta"
import { isInSSR } from "../../utils/isInSSR"
import theme from "../../utils/theme"
import { toHMS } from "../../utils/toHMS"
import { differenceInSeconds } from "date-fns"

import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader"
import { Stack } from "./Stack"

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

  ${Details} {
    & > :nth-child(2) {
      margin: 0 28px 0 42px;
      flex-shrink: 0;
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
  border-top-right-radius: 4px;
  max-width: 220px;
`

const TRESHOLDS = [
  [60, "Don't scroll, just read it 🐼"] as const,
  [180, "Well, let me believe you've read it 🐍"] as const,
  [240, "Holy cow, did you really read this? Thanks! 🤓"] as const,
  [480, "Thanks for reading 🤓"] as const,
  [1000, "Hmmm... Are you afk? 🤓"] as const,
  [100000, "What???????????????? 🤓"] as const,
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

  return null
}

export default function ({ pageContext }: Props): React.ReactElement {
  const [readedIn, setReadedIn] = useState(0)
  const [progress, setProgress] = useState(0)

  const {
    article: { frontmatter, author, thumbnail, body, slug, stack },
  } = pageContext

  const { title, description, tags, readTime } = frontmatter

  const pageTitle = `${title} | by ${author.firstName} ${author.lastName} | GreenOn Software`

  useLayoutEffect(() => {
    if (!isInSSR()) {
      window.scrollY = 0
      const offset = 250
      const start = new Date()
      let finished = false

      const handleScroll = () => {
        if (finished) {
          return
        }

        let w =
          ((document.body.scrollTop || document.documentElement.scrollTop) /
            (document.documentElement.scrollHeight -
              document.documentElement.clientHeight -
              offset)) *
          100
        setProgress(w)

        if (w >= 100) {
          setReadedIn(Math.abs(differenceInSeconds(start, new Date())))
          finished = true
        }
      }

      document.addEventListener("scroll", handleScroll)

      return () => {
        document.removeEventListener("scroll", handleScroll)
      }
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
          <Stack items={stack} />
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
