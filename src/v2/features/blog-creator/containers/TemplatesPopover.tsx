import React, { useMemo } from "react"
import { Popover } from "../components/Popover"
import { IconButton, TemplateIcon, X } from "../../../../ui"
import { useClipboard } from "../../../../utils/useClipboard"
import { useBlogCreatorPageProvider } from "../BlogCreatorPageProvider"
import { useBlogCreatorAlertsProvider } from "../providers/BlogCreatorAlertsProvider"
import { PopoverContent } from "../components/PopoverContent"
import { useToggle } from "../../../utils/useToggle"
import styled from "styled-components"
import theme from "../../../../utils/theme"

interface Markdown {
    key: string
    label: string
    code: string
}

const Templates = styled.div`
  display: grid;
  justify-content: center;
  grid-template-rows: auto auto;
  grid-template-columns: auto auto;
  gap: 12px;
`

const Template = styled.div`
  justify-content: center;
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

export const TemplatesPopover = () => {
    const { add } = useBlogCreatorAlertsProvider()
    const creator = useBlogCreatorPageProvider()
    const { copy } = useClipboard()
    const previewModal = useToggle()

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

    const handleClick = (value: string): void => {
        add({
            message: creator.t.copied_and_paste_now,
        })

        copy(value)
    }


    return (
        <Popover
            disabled={previewModal.opened}
            label={creator.t.choose_template}
            position={3}
            trigger={toggler => (
                <IconButton title={creator.t.choose_template} onClick={toggler.open}>
                    <TemplateIcon />
                </IconButton>
            )}
        >
            {toggler => (
                <PopoverContent>
                    <Templates>
                        {markdowns.map(md => (
                            <Template
                                className="row"
                                key={md.key}
                                onClick={() => {
                                    toggler.close()
                                    handleClick(md.code)
                                }}
                            >
                                <X>{md.label}</X>
                            </Template>
                        ))}
                    </Templates>
                </PopoverContent>
            )}
        </Popover>
    )
}
