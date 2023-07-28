import React, { Fragment, useState } from "react"
import styled from "styled-components"
import { Link as GatsbyLink } from "gatsby"
import theme from "../../utils/theme"
import { ChevronIcon, IconButton, Label, M, S } from "../../ui"
import { M_DOWN } from "../../utils/viewport"
import { formatMinutes } from "../../utils/formatMinutes"

const TextContent = styled.div`
  ${S} {
    margin-top: 2px;
    color: ${theme.grayA};
  }
`

const LessonListItem = styled.li`
  border-radius: 4px;
  background: ${theme.blackA};
  padding: 12px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;

    * {
      color: ${theme.primary};
    }
  }

  a {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .minutes {
      margin-left: 20px;
      flex-shrink: 0;
    }
  }

  &.active p {
    color: ${theme.green};
  }
`

const LessonsList = styled.ul`
  padding: 0 0 20px 0;
  margin: 0;

  ${LessonListItem} {
    margin: 0 0 12px 0;
  }
`

const ChaptersListItem = styled.li`
  justify-content: space-between;
  cursor: pointer;

  &.active {
    .chapter-name {
      color: ${theme.green};
    }
  }

  ${TextContent} {
    margin-right: 16px;

    .chapter-name {
      display: flex;
    }

    @media ${M_DOWN} {
      margin-left: 0;
    }
  }
`

const ChaptersList = styled.ul`
  margin: 0;
  padding: 0;

  ${ChaptersListItem} {
    margin-bottom: 12px;

    .toggle-btn svg {
      transform: rotate(180deg);
    }

    .toggle-btn.expanded svg {
      transform: rotate(0deg);
    }

    @media ${M_DOWN} {
      .toggle-btn {
        display: none;
      }
    }
  }
`

export interface CourseChaptersProps {
  activeLessonId?: string
  activeChapterId?: string
  chapters: {
    duration: number
    title: string
    lessons: {
      title: string
      duration: number
      path: string
    }[]
  }[]
}

export const CourseChapters = ({
  activeLessonId,
  activeChapterId,
  chapters,
}: CourseChaptersProps) => {
  const [hidden, setHidden] = useState<Record<string, boolean>>({})

  const toggle = (title: string): void => {
    setHidden({
      ...hidden,
      [title]: hidden[title] ? false : true,
    })
  }

  return (
    <ChaptersList className="components-course-chapters col">
      {chapters.map((chapter, index) => (
        <Fragment key={chapter.title}>
          <ChaptersListItem
            className={`row${
              activeChapterId === chapter.title ? " active" : ""
            }`}
            onClick={() => toggle(chapter.title)}
          >
            <TextContent className="col">
              <Label className="chapter-name">
                {index + 1}. {chapter.title}
              </Label>
              <S>{formatMinutes(chapter.duration)}</S>
            </TextContent>
            <IconButton
              className={`toggle-btn ${
                hidden[chapter.title] ? "expanded" : ""
              }`}
              variant="secondary-outlined"
            >
              <ChevronIcon />
            </IconButton>
          </ChaptersListItem>

          {hidden[chapter.title] || (
            <LessonsList className="col">
              {chapter.lessons.map(lesson => (
                <LessonListItem
                  className={
                    activeChapterId === chapter.title &&
                    activeLessonId === lesson.title
                      ? "active"
                      : ""
                  }
                  key={lesson.title}
                >
                  <GatsbyLink to={lesson.path}>
                    <M>{lesson.title}</M>
                    <S className="minutes">
                      {formatMinutes(lesson.duration, true)}
                    </S>
                  </GatsbyLink>
                </LessonListItem>
              ))}
            </LessonsList>
          )}
        </Fragment>
      ))}
    </ChaptersList>
  )
}
