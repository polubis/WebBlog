import React, { useEffect, useRef } from "react"
import Button from "../../components/button/Button"
import {
  LoadInvtationsPayload,
  invitations,
  useInvitationPrepare,
} from "../logic/useInvitationPrepare"
import { useLayoutProvider } from "../providers/LayoutProvider"
import { Modal, X, XL } from "../../ui"
import { useClipboard } from "../../utils/useClipboard"
import styled from "styled-components"
import theme from "../../utils/theme"

interface ShareButtonProps extends LoadInvtationsPayload {}

const Container = styled.div`
  display: grid;
  justify-content: center;
  grid-template-rows: auto auto;
  grid-template-columns: auto auto;
  gap: 12px;
  margin-top: 28px;

  & > * {
    border-radius: 4px;
    padding: 12px;
    border: 1px solid ${theme.bg2};
    cursor: pointer;

    &:hover {
      border-color: ${theme.primary};

      ${X} {
        color: ${theme.primary};
      }
    }

    ${X} {
      text-align: center;
    }
  }
`

const ShareButton = (props: ShareButtonProps) => {
  const layout = useLayoutProvider()
  const [state, { load, reset }] = useInvitationPrepare()
  const { state: copyState, copy, reset: resetCopy } = useClipboard()
  const timeout = useRef<NodeJS.Timeout | null>(null)

  const handleSelect = (content: string): void => {
    copy(content)
    reset()

    timeout.current = setTimeout(resetCopy, 1500)
  }

  useEffect(() => {
    return () => {
      timeout.current && clearTimeout(timeout.current)
    }
  }, [])

  return (
    <>
      <Button disabled={state.is === "busy"} onClick={() => load(props)}>
        {copyState.status === "copied" ? layout.t.copied : layout.t.share}
      </Button>
      {state.is === "ok" && (
        <Modal maxWidth="400px" onClose={reset}>
          <XL>{layout.t.invitations}</XL>
          <Container className="wrap">
            {invitations.map(invitation => (
              <div
                key={invitation}
                onClick={() => handleSelect(state.invitations[invitation])}
              >
                <X>{invitation}</X>
              </div>
            ))}
          </Container>
        </Modal>
      )}
    </>
  )
}

export { ShareButton }
