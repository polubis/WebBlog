import React, { useState } from "react"
import { VotesBox } from "../components/VotesBox"
import { VoteDownButton, VoteUpButton } from "./VoteButtons"
import Loadable from "react-loadable"
import { VoteUpdateAction } from "../providers/models"
import { useArticleProvider } from "../providers/ArticleProvider"

const Votes = Loadable({
  loader: () => import("./Votes").then(m => m.Votes),
  loading: () => <VotesBox />,
})

export const AddVoteSection = () => {
  const [action, setAction] = useState<null | VoteUpdateAction>(null)
  const {
    state: { vote },
  } = useArticleProvider()

  if (action) {
    return <Votes action={action} />
  }

  return (
    <VotesBox>
      <VoteUpButton
        disabled={vote.is === "added"}
        vote={vote.vote.positive}
        onClick={() => setAction("increment")}
      />
      <VoteDownButton
        vote={vote.vote.negative}
        disabled={vote.is === "added"}
        onClick={() => setAction("decrement")}
      />
    </VotesBox>
  )
}
