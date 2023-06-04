import React from "react"
import {
    ArrowLeftIcon,
    AutoPlayIcon,
    CloseIcon,
    DeleteIcon,
    EditIcon,
    FullscreenIcon,
    IconButton,
    PlusIcon,
    RightArrowIcon,
    SubmitIcon,
} from "../../ui"

import styled from "styled-components"

const KeyboardLetter = styled.span`
  position: absolute;
  bottom: 2px;
  right: 2px;
  font-size: 10px;
`

interface ButtonStaticProps {
    Icon: () => JSX.Element
    letter: string
    className: string
    title: string
}

const CreateButton = <
    P extends {
        onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
        className?: string,
        title?: string,
        letter?: string,
        Icon?: () => JSX.Element
    }
>({
    Icon,
    letter,
    title,
    className,
}: ButtonStaticProps) => (props: P) => {
    return (
        <IconButton
            {...props}
            title={props.title ? props.title : title}
            className={`${className}${props.className ? " " + props.className : ""}`}
        >
            {props.Icon ? <props.Icon /> : <Icon />}
            <KeyboardLetter className="letter">{props.letter ? props.letter : letter}</KeyboardLetter>
        </IconButton>
    )
}

export const CloseFullScreenButton = CreateButton({
    title: "Close full screen",
    Icon: CloseIcon,
    className: "close-preview-view-btn",
    letter: "ESC",
})

export const SubmitFramesButton = CreateButton({
    title: "Submit your animated snippet",
    Icon: SubmitIcon,
    className: "submit-frames-btn",
    letter: "S",
})

export const PreviousButton = CreateButton({
    className: "snippet-creator-btn",
    title: "Go to previous",
    letter: "A",
    Icon: ArrowLeftIcon,
})

export const NextButton = CreateButton({
    className: "snippet-creator-btn",
    title: "Go to next",
    letter: "D",
    Icon: RightArrowIcon,
})

export const AutoPlayButton = CreateButton({
    className: "snippet-creator-btn",
    title: "Start or stop auto play",
    letter: "P",
    Icon: AutoPlayIcon,
})

export const AddFrameButton = CreateButton({
    className: "snippet-creator-btn add-btn",
    title: "Add snippet frame",
    letter: "N",
    Icon: PlusIcon,
})

export const OpenFullScreenButton = CreateButton({
    className: "snippet-creator-btn",
    title: "Open full screen mode",
    letter: "F",
    Icon: FullscreenIcon,
})

export const EditButton = CreateButton({
    className: "snippet-creator-btn edit-btn",
    title: "Edit snippet frame",
    letter: "E",
    Icon: EditIcon,
})

export const DeleteFrameButton = CreateButton({
    className: "snippet-creator-btn delete-frame-btn",
    title: "Delete snippet frame",
    letter: "R",
    Icon: DeleteIcon,
})
