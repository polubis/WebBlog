import React from "react"
import type { ReactNode } from "react"
import { Modal, X, useModal } from "../../ui"
import styled from "styled-components"
import { Avatar } from "../../models"
import GatsbyImage from "gatsby-image"
import theme from "../../utils/theme"
import { SM_DOWN } from "../../utils/viewport"

const Container = styled.div`
  display: flex;
  flex-flow: column;

  ${X} {
    margin-bottom: 24px;
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 12px;

  @media ${SM_DOWN} {
    grid-template-columns: auto auto;
  }
`

const Item = styled.button`
  cursor: pointer;
  border-radius: 50%;
  background: none;
  display: flex;
  align-items: center;
  width: 88px;
  height: 88px;
  justify-content: center;
  border: 1px solid ${theme.primary};

  &.components-avatar-picker-item-active {
    border-color: ${theme.green};
  }

  &:hover {
    transform: scale(1.1);
  }
`

type AvatarName = Avatar["name"]

interface AvatarsPickerProps {
  activeName?: AvatarName
  avatars: Avatar[]
  trigger: (toggle: ReturnType<typeof useModal>["toggle"]) => ReactNode
  onChange: (activeName: AvatarName) => void
}

const AvatarsPicker = ({
  activeName,
  avatars,
  trigger,
  onChange,
}: AvatarsPickerProps) => {
  const { isOpen, toggle } = useModal(true)

  const handleChange = (name: AvatarName): void => {
    onChange(name)
    toggle()
  }

  return (
    <>
      {trigger(toggle)}
      {isOpen && (
        <Modal onClose={toggle}>
          <Container className="components-avatar-picker">
            <X>Pick your avatar</X>
            <Grid>
              {avatars.map(avatar => (
                <Item
                  key={avatar.name}
                  className={
                    activeName === avatar.name
                      ? "components-avatar-picker-item-active"
                      : ""
                  }
                  onClick={() => handleChange(avatar.name)}
                >
                  <GatsbyImage
                    fluid={avatar.fluid}
                    alt={avatar.name}
                    style={{
                      width: "72px",
                      height: "72px",
                    }}
                  />
                </Item>
              ))}
            </Grid>
          </Container>
        </Modal>
      )}
    </>
  )
}

export type { AvatarsPickerProps }

export { AvatarsPicker }
