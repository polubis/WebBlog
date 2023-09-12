import React, { useRef, KeyboardEventHandler } from "react"
import { Popover } from "../components/Popover"
import { IconButton, Input, S, Textarea } from "../../../../ui"
import { useClipboard } from "../../../../utils/useClipboard"
import { useBlogCreatorPageProvider } from "../BlogCreatorPageProvider"
import { useBlogCreatorAlertsProvider } from "../providers/BlogCreatorAlertsProvider"
import { PopoverContent } from "../components/PopoverContent"
import { ImageIcon } from "../../../../ui/icons/ImageIcon"
import { useForm } from "../../../../utils/useForm"
import { useLayoutProvider } from "../../../providers/LayoutProvider"

export const ImagePopover = () => {
    const pasted = useRef(false)
    const [{ values }, { set, reset }] = useForm({
        values: {
            url: "",
            description: "",
        },
    })
    const layout = useLayoutProvider()
    const { add } = useBlogCreatorAlertsProvider()
    const creator = useBlogCreatorPageProvider()
    const { copy } = useClipboard()

    const handleCtrlCV: KeyboardEventHandler<HTMLInputElement> = e => {
        if (e.ctrlKey && e.key === "v") {
            pasted.current = true
        }
    }

    const handleConfirm = (): void => {
        let value = creator.samples.image
        const changed = values.description !== "" && values.url !== ""

        if (changed) {
            add({
                message: creator.t.copied_and_paste_now,
            })
        } else {
            add({
                message: creator.t.default_copied_and_paste_now,
            })
        }

        const isGDriveUrl =
            /https:\/\/drive\.google\.com/g.test(values.url) &&
            /usp=drive_link/g.test(values.url)

        if (isGDriveUrl) {
            const gDriveId = values.url.split('/')[5]
            values.url = `https://drive.google.com/uc?export=view&id=${gDriveId}`
        }

        if (values.url !== "") {
            value = value.replace(/src="([^"]*)"/g, `src="${values.url}"`)
        }

        if (values.description !== "") {
            value = value.replace(
                /description="([^"]*)"/g,
                `description="${values.description}"`
            )
        }

        copy(value)
        reset();
    }

    return (
        <Popover
            label={`${creator.t.add_image} - <Img />`}
            position={1}
            trigger={toggler => (
                <IconButton title={creator.t.add_image} onClick={toggler.open}>
                    <ImageIcon />
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
                            value={values.url}
                            onChange={e => {
                                set({ key: "url", value: e.target.value })

                                if (pasted.current) {
                                    pasted.current = false
                                    const element = document.getElementById('image-popover-description')
                                    element?.focus()
                                }
                            }}
                        />
                        <Textarea
                            id='image-popover-description'
                            placeholder={creator.t.description}
                            value={values.description}
                            onChange={e => set({ key: "description", value: e.target.value })}
                        />
                        <S>{creator.t.skip_edition_disclaimer}</S>
                    </>

                    <button
                        className="upper button primary"
                        onClick={() => {
                            handleConfirm()
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
