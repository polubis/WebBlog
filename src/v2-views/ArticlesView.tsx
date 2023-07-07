import React from "react"
import { SupportedExternalLink, SupportedRoute } from "../models"
import { useScrollToTop } from "../utils/useScrollToTop"
import { ArticlesViewProps } from "./models"
import { Link as GLink } from "gatsby"
import { Content, FilterIcon, IconButton, Layout, Navigation } from "../ui"
import { GreenOnLogo } from "../components/GreenOnLogo"
import { Footer } from "../v2-components/Footer"
import { ArticlesJumbo } from "../features/articles/ArticlesJumbo"
import Grid from "../components/article/Grid"
import Button from "../components/button/Button"
import { NoArticles } from "../features/articles/NoArticles"
import { useArticlesFilters } from "../features/articles/useArticlesFilters"
import { FiltersForm } from "../features/articles/FiltersForm"

const Link = ({ to, label }: { to: SupportedRoute; label: string }) => (
  <GLink to={to} className="link" activeClassName="active">
    {label}
  </GLink>
)

const ArticlesView = ({ articles, bubblesImg, authors }: ArticlesViewProps) => {
  const articlesFilters = useArticlesFilters(authors, articles)
  const {
    filters,
    reset,
    changed,
    filteredArticles,
    changeQuery,
  } = articlesFilters
  useScrollToTop()

  const HomeLink = <Link to="/" label="Home" />
  const ArticlesLink = <Link to="/articles/" label="Articles" />
  const AuthorsLink = <Link to="/authors/" label="Authors" />
  const CoursesLink = <Link to="/courses/" label="Courses" />
  const SnippetsCreatorLink = <Link to="/snippet-creator/" label="Snippets" />
  const ArticlesCreatorLink = (
    <Link to="/blog-creator/" label="Create article" />
  )

  return (
    <Layout
      navigation={
        <Navigation
          logo={
            <GLink
              to={"/" as SupportedRoute}
              style={{ textDecoration: "none" }}
            >
              <GreenOnLogo full />
            </GLink>
          }
          leftLinks={
            <>
              {ArticlesLink}
              {AuthorsLink}
              {CoursesLink}
            </>
          }
          rightLinks={
            <>
              {ArticlesCreatorLink}
              {SnippetsCreatorLink}
            </>
          }
          mobileLinks={
            <>
              {ArticlesLink}
              {AuthorsLink}
              {CoursesLink}
              {ArticlesCreatorLink}
              {HomeLink}
              {SnippetsCreatorLink}
            </>
          }
          action={
            <a
              className="button primary uppercase"
              href={"https://discord.gg/PxXQayT3x3" as SupportedExternalLink}
              title="Discord members"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join
            </a>
          }
        />
      }
      footer={
        <Footer
          articles={articles}
          t={{
            navigationLabel: "Navigation",
            aboutUs: "About us",
            aboutUsText:
              "We're an educational platform that produces high quality articles, courses and teaching materials.",
            aboutUsTextCommunity: "You can join our community via",
            thisFormLink: "this link",
            poweredBy: "Powered by",
            recommendedArticles: "Recommended articles",
          }}
          links={
            <>
              {ArticlesLink}
              {AuthorsLink}
              {CoursesLink}
              {ArticlesCreatorLink}
              {HomeLink}
              {SnippetsCreatorLink}
            </>
          }
        />
      }
    >
      <ArticlesJumbo
        bubblesImg={bubblesImg}
        filtersForm={
          <FiltersForm
            {...articlesFilters}
            authors={authors}
            trigger={modal => (
              <IconButton
                className={`filter-button${changed ? " active" : ""}`}
                onClick={modal.open}
              >
                <FilterIcon />
              </IconButton>
            )}
          />
        }
        {...articlesFilters}
      />
      <Content paddingY>
        {filteredArticles.length === 0 ? (
          <NoArticles>
            <Button onClick={reset}>Reset filters</Button>
          </NoArticles>
        ) : (
          <Grid articles={filteredArticles} />
        )}
      </Content>
    </Layout>
  )
}

export default ArticlesView
