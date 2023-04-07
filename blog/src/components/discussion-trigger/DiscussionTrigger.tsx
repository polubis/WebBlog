import React from "react"
import {
  DiscussionState,
  WithDiscussion,
  useWithDiscussion,
} from "../../features/discussion/WithDiscussion"
import Button from "../button/Button"

const getTitle = (status: DiscussionState["status"]): string => {
  if (status === "idle") return "DISCUSSION"

  return "CLOSE DISCUSSION"
}

const DiscussionTrigger = () => {
  const ctx = useWithDiscussion()

  return (
    <Button
      className="components-discussion-trigger"
      onClick={ctx.state.status === "idle" ? ctx.open : ctx.close}
    >
      {getTitle(ctx.state.status)}
    </Button>
  )
}

const ConnectedDiscussionTrigger = () => {
  return (
    <WithDiscussion>
      <DiscussionTrigger />
    </WithDiscussion>
  )
}

export { ConnectedDiscussionTrigger as DiscussionTrigger }
