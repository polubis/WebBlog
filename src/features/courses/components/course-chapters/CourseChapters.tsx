import React, { Fragment, useState } from "react"
import styled from "styled-components"
import { Chapter, Lesson } from "../../../../models"
import { ChevronIcon, IconButton, Label, M, S } from "../../../../ui"
import { formatMinutes } from "../../../../utils/formatMinutes"
import theme from "../../../../utils/theme"
import { M_DOWN } from "../../../../utils/viewport"
import { Link as GatsbyLink } from "gatsby"

const TextContent = styled.div`
  display: flex;
  flex-flow: column;

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
  }

  a {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:hover,
    &:active {
      text-decoration: none;
    }

    .minutes {
      margin-left: 12px;
    }
  }

  &.active p {
    color: ${theme.green};
  }
`

const LessonsList = styled.ul`
  display: flex;
  flex-flow: column;
  padding: 0 0 20px 0;
  margin: 0;

  ${LessonListItem} {
    margin: 0 0 12px 0;
  }
`

const ChaptersListItem = styled.li`
  display: flex;
  align-items: center;
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
  display: flex;
  flex-flow: column;
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
  activeLessonId?: Lesson["id"]
  activeChapterId?: Chapter["id"]
  chapters: Chapter[]
}

export const CourseChapters = ({
  activeLessonId,
  activeChapterId,
  chapters,
}: CourseChaptersProps) => {
  const [hiddenChapters, setHiddenChapters] = useState<Record<string, boolean>>(
    {}
  )

  const handleChapterToggle = (name: Chapter["name"]): void => {
    setHiddenChapters(prevChapters => ({
      ...prevChapters,
      [name]: hiddenChapters[name] ? false : true,
    }))
  }

  return (
    <ChaptersList className="components-course-chapters">
      {chapters.map((chapter, index) => (
        <Fragment key={chapter.name}>
          <ChaptersListItem
            className={activeChapterId === chapter.id ? "active" : ""}
            onClick={() => handleChapterToggle(chapter.name)}
          >
            <TextContent>
              <Label className="chapter-name">
                {index + 1}. {chapter.name}
              </Label>
              <S>{formatMinutes(chapter.duration)}</S>
            </TextContent>
            <IconButton
              className={`toggle-btn ${
                hiddenChapters[chapter.name] ? "expanded" : ""
              }`}
              variant="secondary-outlined"
            >
              <ChevronIcon />
            </IconButton>
          </ChaptersListItem>

          {hiddenChapters[chapter.name] || (
            <LessonsList>
              {chapter.lessons.map(lesson => (
                <LessonListItem
                  className={
                    activeChapterId === chapter.id &&
                    activeLessonId === lesson.id
                      ? "active"
                      : ""
                  }
                  key={lesson.name}
                >
                  <GatsbyLink to={lesson.path}>
                    <M>{lesson.name}</M>
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
