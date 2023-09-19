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

const Content = () => {
  const layout = useLayoutProvider()
  const data = useArticleBasedDataProvider()

  console.log(data)

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
