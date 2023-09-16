import React, {
  KeyboardEventHandler,
  useLayoutEffect,
  useRef,
  ChangeEventHandler as ReactChangeEventHandler,
} from "react"
import { Popover } from "../components/Popover"
import { Field, IconButton, Input, S } from "../../../../ui"
import { LinkIcon } from "../../../../ui/icons/LinkIcon"
import { useClipboard } from "../../../../utils/useClipboard"
import { useBlogCreatorPageProvider } from "../BlogCreatorPageProvider"
import { useBlogCreatorAlertsProvider } from "../providers/BlogCreatorAlertsProvider"
import { PopoverContent } from "../components/PopoverContent"
import { useLayoutProvider } from "../../../providers/LayoutProvider"
import { useForm } from "../../../../utils/useForm"
import { LinkPopoverFormData } from "./models"
import { InteractiveButton } from "../../../../ui/snippet/InteractiveButton"

const initial_values: LinkPopoverFormData = {
  url: "",
  title: "",
}

export const LinkPopover = () => {
  const { add } = useBlogCreatorAlertsProvider()
  const creator = useBlogCreatorPageProvider()
  const layout = useLayoutProvider()
  const { copy } = useClipboard()
  const previousValues = useRef<LinkPopoverFormData | null>(null)

  const [{ values }, { set, reset }] = useForm<LinkPopoverFormData>({
    values: initial_values,
  })

  const pasted = useRef(false)

  const handleCtrlCV: KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.ctrlKey && e.key === "v") {
      pasted.current = true
    }
  }

  const handleUrlChange: ReactChangeEventHandler<HTMLInputElement> = e => {
    set({ key: "url", value: e.target.value })
  }

  const handleTitleChange: ReactChangeEventHandler<HTMLInputElement> = e => {
    set({ key: "title", value: e.target.value })
  }

  const handleConfirm = (toggler: { close(): void }): void => {
    const titleChanged = values.title !== ""
    const urlChanged = values.url !== ""
    const changed = titleChanged || urlChanged
    let sample = creator.samples.link

    if (changed) {
      add({
        message: creator.t.copied_and_paste_now,
      })

      if (urlChanged) {
        sample = sample.replace(/href="([^"]*)"/g, `href="${values.url}"`)
      }

      if (titleChanged) {
        sample = sample.replace(
          /(>([A-Za-z0-9\s]+)<)/g,
          `>\n   ${values.title}\n<`
        )
      }
    } else {
      add({
        message: creator.t.default_copied_and_paste_now,
      })
    }

    copy(sample)
    toggler.close()
    previousValues.current = values
    reset()
  }

  const handleUsePreviousClick = (): void => {
    const { title, url } = previousValues.current!

    set({ key: "title", value: title })
    set({ key: "url", value: url })
  }

  useLayoutEffect(() => {
    if (pasted.current) {
      pasted.current = false
      const element = document.getElementById("link-popover-title")
      element?.focus()
    }
  }, [values.url])

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
            <Field description={creator.t.url_description}>
              <Input
                autoFocus
                placeholder="URL"
                onKeyDown={handleCtrlCV}
                value={values.url}
                onChange={handleUrlChange}
              />
            </Field>

            <Field description={creator.t.title_description}>
              <Input
                id="link-popover-title"
                placeholder={creator.t.title}
                onChange={handleTitleChange}
                value={values.title}
              />
            </Field>

            <S>{creator.t.skip_edition_disclaimer}</S>

            {previousValues.current && (
              <InteractiveButton
                onClick={handleUsePreviousClick}
              >
                {status =>
                  status === "pending" ? (
                    <>✅ {creator.t.used}</>
                  ) : (
                    <>➕ {creator.t.use_previous}</>
                  )
                }
              </InteractiveButton>
            )}
          </>

          <button
            className="upper button primary"
            onClick={() => handleConfirm(toggler)}
          >
            {layout.t.copy}
          </button>
        </PopoverContent>
      )}
    </Popover>
  )
}
