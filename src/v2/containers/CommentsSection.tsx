
import React, { memo } from "react"
import { FirebaseProvider } from "../providers/FirebaseProvider"
import { CommentsProvider } from "../features/comments/CommentsProvider"
import { useLayoutProvider } from "../providers/LayoutProvider"
import { CommentsProviderCtx } from "../features/comments/models"
import { M, XL } from "../../ui"
import { Rate } from "../components/Rate"
import { CommentsSectionProps } from "./models"
import { CommentsView } from "../features/comments/CommentsView"
import { useAnalytics } from "../../utils/useAnalytics"

const ConnectedComments = ({ state, load, reset, rate }: CommentsProviderCtx & Pick<CommentsSectionProps, 'rate'>) => {
    const layout = useLayoutProvider()
    const { track } = useAnalytics()

    return (
        <>
            <div className="section">
                {rate && (
                    <div className="article-comment-rate">
                        <XL>
                            <Rate rate={rate} />
                        </XL>
                    </div>
                )}
                <XL>{layout.t.comments.header}</XL>
                <M>{layout.t.comments.description}</M>
                <M>{layout.t.comments.notice}</M>
                <M>{layout.t.comments.if_you_want_to_see}</M>
                {state.is === "idle" ? (
                    <button
                        title={layout.t.comments.open}
                        className="upper button primary"
                        onClick={() => {
                            track({ name: "comments_section_opened" })
                            load()
                        }}
                    >
                        {layout.t.comments.open}
                    </button>
                ) : (
                    <button
                        title={layout.t.comments.close}
                        className="upper button primary"
                        onClick={reset}
                    >
                        {layout.t.comments.close}
                    </button>
                )}
            </div>
            {state.is !== "idle" && <CommentsView />}
        </>
    )
}

const createPath = (path: string): string => {
    const parts = path.replace(/\//g, "-").split("-")
    parts.pop()
    parts.shift()

    return parts.join("-")
}

const CommentsSection = memo(({ path, rate }: CommentsSectionProps) => {
    const layout = useLayoutProvider()

    return (
        <FirebaseProvider>
            <CommentsProvider path={createPath(path)} lang={layout.lang.key}>
                {props => <ConnectedComments {...props} rate={rate} />}
            </CommentsProvider>
        </FirebaseProvider>

    )
})

export { CommentsSection }