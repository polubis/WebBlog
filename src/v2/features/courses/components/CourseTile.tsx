import React from "react"
import styled from "styled-components"
import { CodeEditorTile, M, XL } from "../../../../ui"
import { CourseTileProps } from "./models"
import { CourseTimeBadge } from "../../../../features/courses/components"
import { CourseStatusBadge } from "../../../../features/courses/components/course-status-badge/CourseStatusBadge"

const Container = styled.div`
  border-radius: 4px;

  ${XL} {
    margin-top: 8px;
  }

  ${M} {
    margin: 8px 0 24px 0;
  }

  .course-tile-badges {
    & > * {
      margin: 0 8px 8px 0;
    }

    & > *:last-child {
      margin-right: 0;
    }
  }

  .course-tile-content {
    a {
      margin-top: auto;
    }
  }
`

const CourseTile = ({
  readTime,
  status,
  title,
  description,
  action,
}: CourseTileProps) => {
  return (
    <Container>
      <CodeEditorTile>
        <div className="course-tile-content col">
          <div className="course-tile-badges wrap">
            <CourseTimeBadge value={readTime} />
            <CourseStatusBadge value={status} />
          </div>
          <XL>{title}</XL>
          <M>{description}</M>
          {action}
        </div>
      </CodeEditorTile>
    </Container>
  )
}

export { CourseTile }
