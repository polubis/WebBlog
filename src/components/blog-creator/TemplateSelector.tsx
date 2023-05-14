import React from "react"
import { INIT_MDX, SMALL_MDX, MEDIUM_MDX, HUGE_MDX } from "./config"
import { IconButton, Modal, TemplateIcon, X, XL, useModal } from "../../ui"
import theme from "../../utils/theme"
import styled from "styled-components"

type OnChange = (mdx: string) => void

interface TemplateSelectorProps {
  onChange: OnChange
}

const Column = styled.div`
  display: flex;
  flex-flow: column;
  padding: 0 0 16px 0;

  ${XL} {
    text-align: center;
    margin-bottom: 28px;
  }
`

const Templates = styled.div`
  width: 420px;
  display: grid;
  justify-content: center;
  grid-template-rows: auto auto;
  grid-template-columns: auto auto;
  gap: 20px;
`

const Template = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
  width: 120px;
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
`

const Toolbox = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  position: fixed;
  top: 120px;
  left: -128px;
  right: 0;
  height: 100px;
  width: 52px;
  margin: 0 auto;
  z-index: 1;
  border-radius: 4px;
`

const MARKDOWNS = [SMALL_MDX, MEDIUM_MDX, HUGE_MDX, INIT_MDX] as const
const LABELS = ["Small", "Medium", "Huge", "Default"] as const

export const TemplateSelector = ({ onChange }: TemplateSelectorProps) => {
  const { toggle, isOpen } = useModal()

  const handleChange: OnChange = value => {
    onChange(value)
    toggle()
  }

  return (
    <>
      <Toolbox>
        <IconButton onClick={toggle}>
          <TemplateIcon />
        </IconButton>
      </Toolbox>

      {isOpen && (
        <Modal onClose={toggle}>
          <Column>
            <XL>Choose template</XL>
            <Templates>
              {MARKDOWNS.map((mdx, idx) => (
                <Template key={idx} onClick={() => handleChange(mdx)}>
                  <X>{LABELS[idx]}</X>
                </Template>
              ))}
            </Templates>
          </Column>
        </Modal>
      )}
    </>
  )
}