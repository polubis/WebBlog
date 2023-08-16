import React, { useEffect, useMemo } from "react"
import { useArticleProvider } from "../ArticleProvider"
import { FirebaseProvider } from "../../../providers/FirebaseProvider"
import { VotesProvider } from "../../../providers/VotesProvider"
import { VotesProviderCtx } from "../../../providers/models"
import { VotesBox } from "../../../components/VotesBox"
import styled from "styled-components"
import { useLayoutProvider } from "../../../providers/LayoutProvider"

const Button = styled.button`
  background: transparent;
  outline: none;
  border: 1px solid #c7bdbd;
  border-radius: 4px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Lexend", sans-serif;

  &:hover:not(:disabled) {
    cursor: pointer;
    opacity: 0.7;
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
`

const ConnectedVotes = ({
    addPositive,
    addNegative,
    load,
    state,
}: VotesProviderCtx) => {
    const layout = useLayoutProvider()

    useEffect(() => {
        load()
    }, [])

    return (
        <>
            {state.is === "idle" || (state.is === "loading" && <VotesBox />)}
            {(state.is === "ok" || state.is === "saving") && (
                <VotesBox>
                    <Button title={layout.t.like_this} disabled={state.is === 'saving'} className="center" onClick={addPositive}>
                        👍 {state.vote.positive}
                    </Button>
                    <Button title={layout.t.i_dont_like_this} disabled={state.is === 'saving'} className="center" onClick={addNegative}>
                        👎 {state.vote.negative}
                    </Button>
                </VotesBox>
            )}
        </>
    )
}

export const ArticleVotes = () => {
    const article = useArticleProvider()

    const path = useMemo(() => {
        const commentsPathParts = article.path.replace(/\//g, "-").split("-")
        commentsPathParts.pop()
        commentsPathParts.shift()

        return commentsPathParts.join("-")
    }, [article.path])

    return (
        <FirebaseProvider>
            <VotesProvider path={path}>
                {props => <ConnectedVotes {...props} />}
            </VotesProvider>
        </FirebaseProvider>
    )
}
