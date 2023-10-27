import React, { useEffect } from "react"
import { VotesBox } from "../components/VotesBox"
import { VoteUpButton, VoteDownButton } from "./VoteButtons"
import { useArticleProvider } from "../providers/ArticleProvider"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { Vote } from "../core/models"
import { useFirebase } from "../logic/useFirebase"

interface VotesProps {
  action: "increment" | "decrement"
}

const Votes = ({ action }: VotesProps) => {
  const { state, setState } = useArticleProvider()
  const { db } = useFirebase()

  useEffect(() => {
    const updateVote = async action => {
      try {
        setState(state => ({
          ...state,
          vote: {
            ...state.vote,
            vote: state.vote.vote,
          },
        }))
        const docRef = doc(db, "votes", state.resourcePath)
        const vote = ((await getDoc(docRef)).data() as Vote | undefined) ?? {
          ...state.vote.vote,
        }

        if (action === "decrement") {
          vote.negative++
        } else {
          vote.positive++
        }

        await setDoc(docRef, vote)

        setState(() => ({
          ...state,
          vote: {
            is: "added",
            vote,
          },
        }))
      } catch (error) {
        setState(() => ({
          ...state,
          vote: {
            ...state.vote,
            is: "not-added",
          },
        }))
      }
    }

    updateVote(action)
  }, [])

  const { is } = state.vote

  if (is === "idle" || is === "adding") return <VotesBox />

  const { vote } = state.vote

  return (
    <VotesBox>
      <VoteUpButton disabled={is === "added"} vote={vote.positive} />
      <VoteDownButton disabled={is === "added"} vote={vote.negative} />
    </VotesBox>
  )
}

export { Votes }
