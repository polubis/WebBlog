import React, { useState } from "react"

import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../layout/Layout"
import { ArticleFrontmatter } from "../../models/Article"
import { createArticle } from "../../factories/Article"
import styled from "styled-components"
import ArticleIntroPage from "./ArticleIntroPage"

import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader"
deckDeckGoHighlightElement()

interface Props {
  pageContext: {
    body: string
    slug: string
    frontmatter: ArticleFrontmatter
  }
}

const ArticleLayoutContainer = styled.main`
  padding: 48px 0;
  display: flex;
  flex-flow: column;
  margin: 0 auto;
  width: 920px;
`

export default function ({ pageContext }: Props): React.ReactElement {
  const [introOpen, setIntroOpen] = useState(true)

  const { body, frontmatter, slug } = pageContext

  const article = createArticle({ slug, frontmatter })

  return (
    <Layout>
      <ArticleLayoutContainer>
        {introOpen ? (
          <ArticleIntroPage
            article={article}
            onStartReadingClick={() => setIntroOpen(false)}
          />
        ) : (
          <MDXRenderer>{body}</MDXRenderer>
        )}
      </ArticleLayoutContainer>
    </Layout>
  )
}



// <Artlcle intro>
//   <Intro>
// {/* //     <Thumbnail title src />

// //     <Tags tags />

// //     <Section>
// //         <Text.XL shifted>Text</Text.XL>
// //         <Text.L shifted>Text</Text.L>
// //         <Text.M bold>Text</Text.M>
// //         <Text.M italic>Text <Text.M src=''></Text.M></Text.M>
// //     </Section> */}
//   </Intro>

// //     <Section>
// //         <Text.XL shifted>Text</Text.XL>
// //         <Text.L shifted>Text</Text.L>
// //         <Text.M bold>Text</Text.M>
// //         <Text.M italic>Text</Text.M>
    //        <Img src='' title />
    //        <Code></Code>
// //     </Section> */}

  // <Summary>
  
  // //     <Section>
// //         <Text.XL shifted>Text</Text.XL>
// //         <Text.L shifted>Text</Text.L>
// //         <Text.M bold>Text</Text.M>
// //         <Text.M italic>Text</Text.M>
    //        <Img src='' title />
// //     </Section> */}
  // </Summary>
// </Artlcle>