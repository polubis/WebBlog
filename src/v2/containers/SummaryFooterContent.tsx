import React from "react"
import {
  ArticleBasedDataProvider,
  useArticleBasedDataProvider,
} from "../providers/ArticleBasedDataProvider"
import type { ArticleBasedDataProviderModel } from "../providers/models"
import { AuthorSection } from "./AuthorSection"
import { ObserveMe } from "../components/ObserveMe"
import { A } from "../../ui"
import { useLayoutProvider } from "../providers/LayoutProvider"
import { CommentsSection } from "./CommentsSection"
import { DatesSection } from "./DatesSection"
import { NavigationSection } from "./NavigationSection"
import { PlatformGoal } from "./PlatformGoal"
import styled from "styled-components"
import { T_UP } from "../../utils/viewport"
import theme from "../../utils/theme"

const PlatformGoalContainer = styled.div`
  display: none;

  @media ${T_UP} {
    display: flex;
    margin-top: 30px;
    padding-top: 30px;
    border-top: 2px solid ${theme.grayC};
  }
`

const Content = () => {
  const layout = useLayoutProvider()
  const data = useArticleBasedDataProvider()

  return (
    <>
      <AuthorSection />
      {data.author.linkedin_url !== undefined && (
        <ObserveMe
          author={data.author}
          header={layout.t.observe_me_header}
          description={
            <>
              {layout.t.observe_me_description_first_part}{" "}
              <A href={data.author.linkedin_url} outside>
                LinkedIn
              </A>
              , {layout.t.observe_me_description_second_part}
            </>
          }
          btnTitle={layout.t.observe_me_follow}
        />
      )}
      <CommentsSection />
      <DatesSection />
      <NavigationSection />
      <PlatformGoalContainer>
        <PlatformGoal />
      </PlatformGoalContainer>
    </>
  )
}

const SummaryFooterContent = (props: ArticleBasedDataProviderModel) => {
  return (
    <ArticleBasedDataProvider initialState={props}>
      <Content />
    </ArticleBasedDataProvider>
  )
}

export { SummaryFooterContent }
