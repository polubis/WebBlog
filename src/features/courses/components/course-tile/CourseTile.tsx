import React from "react"
import styled from "styled-components"
import { Course } from "../../../../models"
import { CodeEditorTile, M, XL } from "../../../../ui"
import { Link as GatsbyLink } from "gatsby"
import { CourseTimeBadge } from "../course-time-badge"
import { CourseStatusBadge } from "../course-status-badge/CourseStatusBadge"
import Button from "../../../../components/button/Button"

const Container = styled.div`
  border-radius: 2px;

  ${XL} {
    margin-top: 8px;
  }

  ${M} {
    margin: 8px 0 24px 0;
  }
`

const Content = styled.div`
  display: flex;
  flex-flow: column;
`

const Badges = styled.div`
  display: flex;
  align-items: center;
  flex-flow: wrap;

  & > * {
    margin: 0 8px 8px 0;
  }

  & > *:last-child {
    margin-right: 0;
  }
`

export interface CourseTileProps {
  data: Course
}

export const CourseTile = ({ data }: CourseTileProps) => {
  return (
    <Container>
      <CodeEditorTile>
        <Content>
          <Badges>
            <CourseTimeBadge value={data.duration} />
            <CourseStatusBadge value={data.status} />
          </Badges>
          <XL>{data.name}</XL>
          <M>{data.description}</M>
          <GatsbyLink to={data.path}>
            <Button>CHECK COURSE</Button>
          </GatsbyLink>
        </Content>
      </CodeEditorTile>
    </Container>
  )
}
