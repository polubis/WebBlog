import React from "react"
import { AuthorSection } from "./AuthorSection"
import { ObserveMe } from "../components/ObserveMe"
import { A } from "../../ui"
import { useLayoutProvider } from "../providers/LayoutProvider"
import { CommentsSection } from "./CommentsSection"
import { DatesSection } from "./DatesSection"
import { NavigationSection } from "./NavigationSection"
import { useArticleProvider } from "../providers/ArticleProvider"

const SummaryFooterContent = () => {
  const layout = useLayoutProvider()
  const { state: data } = useArticleProvider()

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
    </>
  )
}

export { SummaryFooterContent }
