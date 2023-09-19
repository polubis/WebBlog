import React from "react"
import styled from "styled-components"
import { ShareButton } from "./ShareButton"
import { useLayoutProvider } from "../providers/LayoutProvider"
import { useAnalytics } from "../../utils/useAnalytics"
import { Link as GatsbyLink } from "gatsby"
import type { NavigationSectionProps } from "./models"
import { T_DOWN } from "../../utils/viewport"

const Container = styled.nav`
  display: flex;
  justify-content: right;

  & > *:not(:first-child) {
    margin: 0 0 0 20px;
  }

  @media ${T_DOWN} {
    flex-flow: column;

    & > *:not(:first-child) {
      margin: 20px 0 0 0;
    }

    & > * {
      max-width: 100%;
      width: 100%;
    }
  }

`

const NavigationSection = ({
    prevPath,
    nextPath,
    sourceUrl,
    url,
    title,
    description,
    duration,
    seniority,
    technologies,
    tags,
}: NavigationSectionProps) => {
    const layout = useLayoutProvider()
    const { track } = useAnalytics()

    return (
        <Container className="navigation-section">
            <ShareButton
                url={sourceUrl}
                link={url}
                title={title}
                description={description}
                time={duration}
                level={seniority}
                tags={tags}
                stack={technologies.map(({ id }) => id)}
            />
            <a
                className="button primary upper"
                href={sourceUrl}
                target="_blank"
                onClick={() => track({ name: "lesson_source_clicked" })}
            >
                {layout.t.show_source}
            </a>
            {prevPath && (
                <GatsbyLink className="button primary upper" to={prevPath}>
                    {layout.t.prev}
                </GatsbyLink>
            )}
            {nextPath && (
                <GatsbyLink className="button primary upper" to={nextPath}>
                    {layout.t.next}
                </GatsbyLink>
            )}
        </Container>
    )
}

export { NavigationSection }
