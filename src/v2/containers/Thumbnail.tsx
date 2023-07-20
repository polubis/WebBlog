import React from "react"
import styled from "styled-components"
import { useArticleProvider } from "../features/article/ArticleProvider"
import Image from "gatsby-image"
import { ArticleTags } from "./ArticleTags"
import { SeniorityLevel } from "../../models"

const Container = styled.div`
  .thumbnail-content {
    justify-content: center;
    align-items: center;
    min-height: 320px;
    z-index: 1;
    padding: 24px;

    .h3 {
      padding: 0 0 12px 0;
      text-align: center;
    }

    .p1 {
      text-align: center;
    }

    .tags {
      padding-bottom: 4px;
    }
  }

  .gatsby-image-wrapper {
    opacity: 0.42;
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
    border: 1px solid #3c3c3c;
  }
`

const imgStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
}

const Thumbnail = () => {
    const {
        article: { title, thumbnail, seniorityLevel, description },
    } = useArticleProvider()

    return (
        <Container className="center r1 rel">
            <div className="thumbnail-content col">
                <ArticleTags />
                <h1 className="h3 tshadow">{title}</h1>
                <p className="p1 tshadow">{description}</p>
            </div>

            <Image
                alt={title}
                title={title}
                fluid={thumbnail}
                loading="eager"
                style={imgStyle}
            />

            {/* <div className="badge">
                <ReadTimeIcon />
                {readTime}m
            </div> */}
            {/* <div className="badge"></div> */}
            {/* <XXL>
                <SeniorityBadge level={seniorityLevel} /> {title}
            </XXL> */}
        </Container>
    )
}

export { Thumbnail }
