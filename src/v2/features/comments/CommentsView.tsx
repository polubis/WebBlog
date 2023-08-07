import React from "react"
import { Aside } from "./components/Aside"
import { Comments } from "./containers/Comments"

export const CommentsView = () => {
  return (
    <Aside>
      <Comments />
    </Aside>
  )
}
