import React, { useState } from "react"
import styled from "styled-components"
import { Chapter, Lesson } from "../../../../models"
import theme from "../../../../utils/theme"
import { usePortal } from "../../../../utils/usePortal"
import { useScroll } from "../../../../utils/useScroll"
import { CourseChapters } from "../course-chapters"
import { CloseIcon, IconButton, ListIcon } from "../../../../ui"
import { L_UP, M_UP } from "../../../../utils/viewport"

const Wrapper = styled.div`
  display: flex;
  background: ${theme.bg};
  padding: 36px 24px 24px 24px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 103;
  overflow-y: auto;

  .components-course-chapters {
    margin: auto auto 0 auto;
    width: 100%;

    @media ${M_UP} {
      width: 400px;
    }
  }
`

const CloseButtonWrapper = styled.div`
  position: absolute;
  z-index: 104;
  top: 24px;
  right: 24px;
`

const Expander = styled.div`
  position: fixed;
  top: 24px;
  right: 24px;

  @media ${L_UP} {
    display: none;
  }

  path {
    fill: ${theme.black};
  }
`

interface MobileCourseChaptersProps {
  chapters: Chapter[]
  lessonId: Lesson["id"]
  chapterId: Chapter["id"]
}

const MobileCourseChapters = ({
  chapterId,
  lessonId,
  chapters,
}: MobileCourseChaptersProps) => {
  const { render } = usePortal()
  const { direction } = useScroll()
  const [open, setOpen] = useState(false)

  const toggleOpen = (): void => {
    setOpen(prev => !prev)
  }

  return render(
    <>
      {!open && (direction === "up" || direction === "idle") && (
        <Expander>
          <IconButton rounded size="medium" onClick={toggleOpen}>
            <ListIcon />
          </IconButton>
        </Expander>
      )}
      {open && (
        <Wrapper>
          <CourseChapters
            activeChapterId={chapterId}
            activeLessonId={lessonId}
            chapters={chapters}
          />
          <CloseButtonWrapper>
            <IconButton
              rounded
              size="medium"
              variant="secondary-outlined"
              onClick={toggleOpen}
            >
              <CloseIcon />
            </IconButton>
          </CloseButtonWrapper>
        </Wrapper>
      )}
    </>
  )
}

export { MobileCourseChapters }
