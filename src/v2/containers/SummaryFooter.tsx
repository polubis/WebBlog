import React from "react"
import styled from "styled-components"
import { useIsVisible } from "../../utils/useIsVisible"
import type { SummaryFooterProps } from "./models"
import c from "classnames"
import { AuthorSection } from "./AuthorSection"
import { NavigationSection } from "./NavigationSection"
import { ObserveMe } from "../components/ObserveMe"
import { A } from "../../ui"
import { useLayoutProvider } from "../providers/LayoutProvider"
import { CommentsSection } from "./CommentsSection"

const config = {
    author_section_height: 92,
    action_control_size: 40,
    action_control_margin: 20,
}

const Container = styled.div`
`

const SummaryFooter = ({
    type
}: SummaryFooterProps) => {
    const { ref, isVisible } = useIsVisible({ threshold: 0.1, useOnce: true })
    const classes = c("col")
    const layout = useLayoutProvider()

    if (isVisible) {
        return (
            <Container className={classes}>
                <AuthorSection
                    role={role}
                    path={path}
                    fullName={fullName}
                    avatar={avatar}
                />
                {/* {article.author.linkedin_url !== undefined && (
                    <ObserveMe
                        author={article.author}
                        header={article.t.observe_me_header}
                        description={
                            <>
                                {article.t.observe_me_description_first_part}{" "}
                                <A href={article.author.linkedin_url!} outside>
                                    LinkedIn
                                </A>
                                , {article.t.observe_me_description_second_part}
                            </>
                        }
                        btnTitle={article.t.observe_me_follow}
                    />
                )} */}
                <CommentsSection path={url} rate={rate} />
                <NavigationSection
                    sourceUrl={sourceUrl}
                    url={url}
                    title={title}
                    description={description}
                    duration={duration}
                    seniority={seniority}
                    technologies={technologies}
                    tags={tags}
                    nextPath={nextPath}
                    prevPath={prevPath}
                />
            </Container>
        )
    }

    return <Container className={classes} ref={ref}></Container>
}

export { SummaryFooter }
