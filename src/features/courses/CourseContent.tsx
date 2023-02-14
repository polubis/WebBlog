import React from "react"
import styled from "styled-components"
import { XXL, ArrowLeftIcon, IconButton, M, Label } from "../../ui"
import { useCourseProvider } from "./CourseProvider"
import { Link as GatsbyLink } from "gatsby"
import Divider from "../../components/divider/Divider"
import Button from "../../components/button/Button"
import Layout from "../../components/layout/Layout"
import { Reviewers } from "../../components/article/Reviewers"
import { CourseTimeBadge, NumberStatistic } from "./components"
import { CourseStatusBadge } from "./components/course-status-badge/CourseStatusBadge"
import { L_DOWN, L_UP, SM_DOWN } from "../../utils/viewport"
import { CourseChapters } from "./components/course-chapters"
import theme from "../../utils/theme"
import Badge from "../../components/article/Badge"
import { formatDistanceStrict } from "date-fns"
import { Stack } from "../../components/article/Stack"

const Details = styled.div`
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

const Section = styled.div`
  display: flex;
  flex-flow: column;

  & > ${Label} {
    margin-bottom: 8px;
  }
`

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Area = styled.section`
  display: flex;
  flex-flow: column;
  height: 100%;
`

const Statistics = styled.div`
  display: flex;
  flex-flow: wrap;

  & > * {
    margin: 0 16px 16px 0;

    @media ${SM_DOWN} {
      width: 100%;
      margin: 0 0 16px 0;
    }
  }
`

const Container = styled.div`
  padding: 80px 0 100px 0;
  display: grid;
  gap: 20px;
  height: 100%;
  grid-template-columns: 70% 40px 1fr;
  grid-template-rows: 1fr;
  max-width: 1280px;
  margin: 0 auto;

  .components-stack {
    margin: 12px 0 72px 0;
  }

  .label {
    color: ${theme.primaryA};
  }

  @media ${L_DOWN} {
    grid-template-columns: 1fr;
    grid-template-rows: unset;
  }

  .details-area {
    ${Header} {
      margin: 0 0 24px 0;
    }

    .name {
      margin: 12px 0 24px 0;
    }

    .divider {
      margin: 20px 0 28px 0;
    }

    .components-reviewers {
      margin: 32px 0 28px 0;
    }

    ${Statistics} {
      margin: 32px 0 0 0;
    }
  }

  .areas-divider {
    @media ${L_UP} {
      width: 1px;
      height: 100%;
      justify-self: center;
    }

    @media ${L_DOWN} {
      display: none;
      width: 100%;
      height: 1px;
      align-self: center;
    }
  }

  .stats-area {
    display: flex;
    flex-flow: column;
  }
`

const ChaptersSection = styled.div`
  display: flex;
  flex-flow: column;

  & > ${Label} {
    margin-bottom: 20px;
  }
`

const StatisticsSection = styled.div`
  display: flex;
  flex-flow: column;

  & > ${Label} {
    margin-bottom: 20px;
  }
`

export const CourseContent = () => {
  const { course } = useCourseProvider()
  return (
    <Layout>
      <Container>
        <Area className="details-area">
          <Header>
            <GatsbyLink to="/courses/">
              <IconButton variant="secondary-outlined">
                <ArrowLeftIcon />
              </IconButton>
            </GatsbyLink>
            <Button>Start</Button>
          </Header>
          <Label className="label">Course overview</Label>
          <XXL className="name">{course.name}</XXL>
          <Details>
            <CourseTimeBadge value={course.duration} />
            <Badge color={theme.secondary}>
              created:{" "}
              {formatDistanceStrict(new Date(course.createdAt), new Date())} ago
            </Badge>
            <Badge color={theme.secondary}>
              updated:{" "}
              {formatDistanceStrict(new Date(course.modifiedAt), new Date())}{" "}
              ago
            </Badge>
            <CourseStatusBadge value={course.status} />
          </Details>
          <Divider className="divider" horizontal />
          <Section>
            <Label className="label">Description</Label>
            <M>{course.description}</M>
          </Section>
          <Reviewers
            author={course.author}
            techReviewer={course.techReviewer}
            lingReviewer={course.lingReviewer}
          />
          <Section>
            <Label className="label">Technologies</Label>
            <Stack items={course.stack} />
          </Section>
          <ChaptersSection>
            <Label className="label">Chapters & lessons</Label>
            <CourseChapters chapters={course.chapters} />
          </ChaptersSection>
        </Area>
        <Divider className="areas-divider" />
        <Area className="stats-area">
          <StatisticsSection>
            <Label className="label">Statistics</Label>
            <Statistics>
              <NumberStatistic label="Total views" value={30} />
              <NumberStatistic label="Added comments" value={50} />
              <NumberStatistic label="Health score" value={30} />
            </Statistics>
          </StatisticsSection>
        </Area>
      </Container>
    </Layout>
  )
}
