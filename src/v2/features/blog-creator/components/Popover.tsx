import React, { useCallback } from "react"
import { CloseIcon, X, useModal } from "../../../../ui"
import type { PopoverProps } from "./models"
import styled from "styled-components"
import { useClickOutside } from "../../../utils/useClickOutside"

const Container = styled.div`
  position: fixed;
  z-index: 100;
  background: #0a0a0a;
  border: 1px solid #aba7a7;
  bottom: 84px;
  border-radius: 4px;
  padding: 12px;
  max-width: 440px;
  max-height: 80vh;
  overflow-y: auto;

  .popover-header {
    justify-content: space-between;

    ${X} {
        margin-right: 16px;
    }
  }
`

export const Popover = ({ children, trigger, position, label, disabled }: PopoverProps) => {
    const toggler = useModal()

    const onOutside = useCallback(() => {
        if (!disabled) {
            toggler.close()
        }
    }, [disabled])

    const { ref } = useClickOutside<HTMLDivElement>({
        onOutside,
    })
    const left = 20 + (position * 52)

    return (
        <div ref={ref}>
            {toggler.isOpen && (
                <Container
                    style={{
                        left: left + "px",
                    }}
                    className="col"
                >
                    <div className="popover-header row">
                        <X>{label}</X>
                        <button
                            className="icon-button secondary small"
                            onClick={toggler.close}
                        >
                            <span>
                                <CloseIcon />
                            </span>
                        </button>
                    </div>

                    {children(toggler)}
                </Container>
            )}
            {trigger(toggler)}
        </div>
    )
}
