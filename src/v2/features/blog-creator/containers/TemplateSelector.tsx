import React, { useEffect, useMemo, useRef, useState } from "react"
import styled from "styled-components"
import theme from "../../../../utils/theme"
import {
  IconButton,
  Modal,
  TemplateIcon,
  X,
  XL,
  useModal,
} from "../../../../ui"
import { useBlogCreatorPageProvider } from "../BlogCreatorPageProvider"
import { useClipboard } from "../../../../utils/useClipboard"
import { Alert } from "../../../../ui/alert/Alert"

type OnChange = (mdx: string) => void

const Column = styled.div`
  padding: 0 0 16px 0;

  ${XL} {
    text-align: center;
    margin-bottom: 28px;
  }
`

const Templates = styled.div`
  display: grid;
  justify-content: center;
  grid-template-rows: auto auto;
  grid-template-columns: auto auto;
  gap: 20px;
`

const Template = styled.div`
  justify-content: center;
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

interface Markdown {
  key: string
  label: string
  code: string
}

export const TemplateSelector = () => {
  const creator = useBlogCreatorPageProvider()
  const { toggle, open, isOpen } = useModal()
  const { copy } = useClipboard()
  const [copyLabel, setCopyLabel] = useState("")
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleOpen = () => {
    timeoutRef?.current && clearTimeout(timeoutRef.current)
    open()
    setCopyLabel("")
  }

  const handleChange: OnChange = value => {
    toggle()
    copy(value)
    setCopyLabel(creator.t.copied)

    timeoutRef.current = setTimeout(() => {
      setCopyLabel("")
    }, 1200)
  }

  useEffect(() => {
    return () => {
      timeoutRef?.current && clearTimeout(timeoutRef.current)
    }
  }, [])

  const markdowns = useMemo(
    () =>
      Object.entries(creator.t.samples)
        .reduce<Markdown[]>((acc, [key, label]) => {
          acc.push({
            key,
            label,
            code: creator.samples[key],
          })
          return acc
        }, [])
        .sort((prev, curr) => {
          if (prev.label > curr.label) return 1
          if (prev.label < curr.label) return -1
          return 0
        }),
    []
  )

  return (
    <>
      <Toolbox className="col">
        <IconButton onClick={handleOpen}>
          <TemplateIcon />
        </IconButton>
      </Toolbox>

      {copyLabel && <Alert message={copyLabel} />}

      {isOpen && (
        <Modal maxWidth="400px" onClose={toggle}>
          <Column className="col">
            <XL>{creator.t.choose_template}</XL>
            <Templates>
              {markdowns.map(md => (
                <Template
                  className="row"
                  key={md.key}
                  onClick={() => handleChange(md.code)}
                >
                  <X>{md.label}</X>
                </Template>
              ))}
            </Templates>
          </Column>
        </Modal>
      )}
    </>
  )
}
