import React, { KeyboardEventHandler, useRef } from "react"
import { Popover } from "../components/Popover"
import { IconButton, Input, S } from "../../../../ui"
import { LinkIcon } from "../../../../ui/icons/LinkIcon"
import { useClipboard } from "../../../../utils/useClipboard"
import { useBlogCreatorPageProvider } from "../BlogCreatorPageProvider"
import { useBlogCreatorAlertsProvider } from "../providers/BlogCreatorAlertsProvider"
import { PopoverContent } from "../components/PopoverContent"
import { useLayoutProvider } from "../../../providers/LayoutProvider"

export const LinkPopover = () => {
    const { add } = useBlogCreatorAlertsProvider()
    const creator = useBlogCreatorPageProvider()
    const layout = useLayoutProvider()
    const { copy } = useClipboard()

    const pasted = useRef(false)

    const handleCtrlCV: KeyboardEventHandler<HTMLInputElement> = e => {
        if (e.ctrlKey && e.key === "v") {
            pasted.current = true
        }
    }

    return (
        <Popover
            label={`${creator.t.add_link} - <A>`}
            position={0}
            trigger={toggler => (
                <IconButton title={creator.t.add_link} onClick={toggler.open}>
                    <LinkIcon />
                </IconButton>
            )}
        >
            {toggler => (
                <PopoverContent>
                    <>
                        <Input
                            autoFocus
                            placeholder="Url"
                            onKeyDown={handleCtrlCV}
                            onChange={e => {
                                if (pasted.current) {
                                    pasted.current = false
                                    add({
                                        message: creator.t.copied_and_paste_now
                                    })
                                    copy(
                                        creator.samples.link.replace(
                                            /href="([^"]*)"/g,
                                            `href="${e.target.value}"`
                                        )
                                    )
                                    toggler.close()
                                }
                            }}
                        />
                        <S>{creator.t.skip_edition_disclaimer}</S>
                    </>

                    <button
                        className="upper button primary"
                        onClick={() => {
                            add({
                                message: creator.t.default_copied_and_paste_now,
                            })
                            copy(creator.samples.link)
                            toggler.close()
                        }}
                    >
                        {layout.t.copy}
                    </button>
                </PopoverContent>
            )}
        </Popover>
    )
}
