import React from "react"
import styled, { keyframes } from "styled-components"
import { T_DOWN } from "../../../../utils/viewport"
import {
  ArrowLeftIcon,
  AutoPlayIcon,
  CloseIcon,
  CloseMenuIcon,
  DeleteIcon,
  DraftEditIcon,
  EditIcon,
  IconButton,
  OpenMenuIcon,
  PlusIcon,
  RightArrowIcon,
  StopAutoPlayIcon,
  SubmitIcon,
} from "../../../../ui"
import type { TriggerChildProps, TriggerProps } from "./models"
import { useSnippetCreatorPageProvider } from "../SnippetCreatorPageProvider"

const KeyboardLetter = styled.span`
  position: absolute;
  bottom: 2px;
  right: 2px;
  font-size: 10px;

  @media ${T_DOWN} {
    display: none;
  }
`

const rotate = keyframes`
    from {
      transform: rotate(0);
    }

    to {
      transform: rotate(360deg);
    }
`

const Wrapper = styled.div`
  path {
    fill: black;
  }

  button.close {
    .letter {
      transform: translate(2.5px, 2.5px) scale(0.75);
    }
  }

  button.playing {
    svg {
      animation: ${rotate} 3.5s ease-in-out infinite;
    }
  }
`

const TriggerChild = ({
  icon,
  letter,
  ...props
}: Pick<TriggerProps, "icon" | "letter"> & TriggerChildProps) => {
  return (
    <Wrapper>
      <IconButton {...props}>
        {icon}
        <KeyboardLetter className="letter">{letter}</KeyboardLetter>
      </IconButton>
    </Wrapper>
  )
}

const Trigger = ({ className, icon, letter, getTitle }: TriggerProps) => (
  props: TriggerChildProps
) => {
  const creator = useSnippetCreatorPageProvider()
  return (
    <TriggerChild
      {...props}
      letter={letter}
      title={getTitle(creator.t)}
      icon={icon}
      className={
        className
          ? " " + className
          : "" + props.className
          ? " " + props.className
          : ""
      }
    />
  )
}

export const SubmitFramesButton = Trigger({
  icon: <SubmitIcon />,
  letter: "S",
  getTitle: t => t.sandbox.submit_snippet,
})

export const NextButton = Trigger({
  getTitle: t => t.sandbox.go_to_next,
  letter: "D",
  icon: <RightArrowIcon />,
})

export const AddFrameButton = Trigger({
  getTitle: t => t.sandbox.add_new_frame,
  letter: "N",
  icon: <PlusIcon />,
})

export const EditButton = Trigger({
  getTitle: t => t.sandbox.edit_current_frame,
  letter: "E",
  icon: <EditIcon />,
})

export const DraftEditButton = Trigger({
  getTitle: t => t.sandbox.create_a_clone,
  letter: "E",
  icon: <DraftEditIcon />,
})

export const DeleteFrameButton = Trigger({
  getTitle: t => t.sandbox.delete_current_frame,
  letter: "R",
  icon: <DeleteIcon />,
})

export const PreviousButton = Trigger({
  getTitle: t => t.sandbox.go_to_previous,
  letter: "A",
  icon: <ArrowLeftIcon />,
})

export const CloseButton = Trigger({
  className: "close",
  getTitle: t => t.sandbox.close,
  letter: "ESC",
  icon: <CloseIcon />,
})

export const MenuButton = ({
  open,
  ...rest
}: { open: boolean } & TriggerChildProps) => {
  const { t } = useSnippetCreatorPageProvider()

  return (
    <TriggerChild
      className="menu"
      letter="B"
      title={open ? t.sandbox.close_menu : t.sandbox.open_menu}
      icon={open ? <CloseMenuIcon /> : <OpenMenuIcon />}
      {...rest}
    />
  )
}

export const AutoPlayButton = ({
  playing,
  ...rest
}: { playing: boolean } & TriggerChildProps) => {
  const { t } = useSnippetCreatorPageProvider()

  return (
    <TriggerChild
      className={playing ? "playing" : undefined}
      letter="P"
      title={playing ? t.sandbox.stop_auto_play : t.sandbox.start_auto_play}
      icon={playing ? <StopAutoPlayIcon /> : <AutoPlayIcon />}
      {...rest}
    />
  )
}
