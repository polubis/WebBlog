import React from "react"
import { useScrollToTop } from "../../../utils/useScrollToTop"
import Layout from "../../containers/Layout"
import {
  ArrowLeftIcon,
  Content,
  IconButton,
  Label,
  M,
  S,
  XXL,
} from "../../../ui"
import { useCoursePageProvider } from "./CoursePageProvider"
import styled from "styled-components"
import { L_DOWN, L_UP, SM_DOWN } from "../../../utils/viewport"
import theme from "../../../utils/theme"
import { Breadcrumbs } from "../../components/Breadcrumbs"
import { useLayoutProvider } from "../../providers/LayoutProvider"
import { Link } from "gatsby"
import Divider from "../../../components/divider/Divider"
import { Stack } from "../../../components/article/Stack"
import { Reviewers } from "../../components/Reviewers"
import Badge from "../../../components/article/Badge"
import { format } from "date-fns"
import { CourseStatusBadge } from "../../components/CourseStatusBadge"
import { CourseChapters } from "../../components/CourseChapters"
import { TimeBadge } from "../../components/TimeBadge"

const Details = styled.div`
  & > * {
    margin: 0 8px 8px 0;
  }
`

const Section = styled.div`
  & > ${Label} {
    margin-bottom: 8px;
  }
`

const Header = styled.header`
  justify-content: space-between;
`

const Area = styled.section`
  height: 100%;
`

const Statistics = styled.div`
  & > * {
    margin: 0 16px 16px 0;

    @media ${SM_DOWN} {
      width: 100%;
      margin: 0 0 16px 0;
    }
  }
`

const Container = styled.div`
  display: grid;
  gap: 20px;
  height: 100%;
  grid-template-columns: 70% 40px 1fr;
  grid-template-rows: 1fr;

  .number-statistic {
    padding: 16px 12px 12px 12px;
    border-radius: 4px;
    background: ${theme.blackA};

    ${S} {
      margin-top: 4px;
    }
  }

  .breadcrumbs {
    margin-bottom: 28px;
  }

  .stack {
    max-width: calc(100vw - 40px);
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
`

const ChaptersSection = styled.div`
  & > ${Label} {
    margin-bottom: 20px;
  }
`

const StatisticsSection = styled.div`
  & > ${Label} {
    margin-bottom: 20px;
  }
`

const CourseView = () => {
  useScrollToTop()

  const layout = useLayoutProvider()
  const course = useCoursePageProvider()

  return (
    <Layout>
      <Content paddingY>
        <Container>
          <Area className="details-area col">
            <Breadcrumbs>
              <Link to={layout.routes.home.to}>{layout.t.home}</Link>
              <Link to={layout.routes.courses.to}>{layout.t.courses}</Link>
              <span>{course.title}</span>
            </Breadcrumbs>
            <Header className="row">
              <Link to={layout.routes.courses.to}>
                <IconButton variant="secondary-outlined">
                  <ArrowLeftIcon />
                </IconButton>
              </Link>
              <Link
                to={course.chapters[0].lessons[0].path}
                className="button primary upper"
              >
                {course.t.start}
              </Link>
            </Header>
            <Label className="label">{course.t.course_overview}</Label>
            <XXL className="name">{course.title}</XXL>
            <Details className="row wrap">
              <TimeBadge value={course.duration} />
              <Badge color={theme.secondary}>
                {layout.t.created}:{" "}
                {format(new Date(course.cdate), "dd-MM-yyyy")}
              </Badge>
              <Badge color={theme.secondary}>
                {layout.t.updated}:{" "}
                {format(new Date(course.mdate), "dd-MM-yyyy")}
              </Badge>
              <CourseStatusBadge value={course.status} />
            </Details>
            <Divider className="divider" horizontal />
            <Section className="col">
              <Label className="label">{course.t.description}</Label>
              <M>{course.description}</M>
            </Section>
            <Reviewers
              author={course.author}
              tech={course.tech_reviewer}
              ling={course.ling_reviewer}
              authorLabel={layout.t.author}
              lingLabel={layout.t.linguistic_check}
              techLabel={layout.t.technical_check}
            />
            <Section className="col">
              <Label className="label">{course.t.technologies}</Label>
              <Stack items={course.technologies} />
            </Section>
            <ChaptersSection className="col">
              <Label className="label">{course.t.chapters_lessons}</Label>
              <CourseChapters chapters={course.chapters} />
            </ChaptersSection>
          </Area>
          <Divider className="areas-divider" />
          <Area className="col">
            <StatisticsSection className="col">
              <Label className="label">{course.t.statistics}</Label>
              <Statistics className="wrap">
                <div className="number-statistic col">
                  <XXL>{course.chapters.length}</XXL>
                  <S>{course.t.chapters_count}</S>
                </div>
                <div className="number-statistic col">
                  <XXL>{course.lessons_count}</XXL>
                  <S>{course.t.lessons_count}</S>
                </div>
              </Statistics>
            </StatisticsSection>
          </Area>
        </Container>
      </Content>
    </Layout>
  )
}

export { CourseView }
