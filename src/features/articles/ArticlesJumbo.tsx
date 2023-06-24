import React from "react"
import styled from "styled-components"
import theme from "../../utils/theme"
import {
  B,
  FilterIcon,
  IconButton,
  Input,
  M,
  Modal,
  XL,
  XXL,
  useModal,
} from "../../ui"
import Button from "../../components/button/Button"
import Divider from "../../components/divider/Divider"
import Img from "gatsby-image"
import { Author, Image, SeniorityLevel } from "../../models"
import { Link } from "gatsby"
import Badge from "../../components/article/Badge"
import AuthorAvatar from "../../components/article/AuthorAvatar"

const Container = styled.figure`
  display: flex;
  position: relative;
  align-items: center;
  flex-flow: column;
  padding: 80px 20px;
  margin: 0;
  background: ${theme.grayE};
  border-bottom: 1px solid ${theme.grayC};
`

const Footer = styled.div`
  display: flex;
  justify-content: center;
`

const Wrapper = styled.div`
  max-width: 480px;
  z-index: 1;

  ${XXL}, ${M} {
    text-align: center;
  }

  ${XXL} {
    margin-bottom: 20px;
  }

  .articles-jumbo-divider {
    margin: 0 auto 32px auto;
  }
`

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 24px 0 40px 0;

  .ui-input {
    width: 100%;
    margin-right: 12px;
  }
`

const FiltersModal = styled.div`
  display: flex;
  flex-flow: column;
  max-width: 400px;

  .diff-level-heading {
    margin: 20px 0 12px 0;
  }

  .articles-jumbo-divider {
    margin: 20px 0;
  }

  .diff-badge {
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }

  .authors-heading {
    margin: 12px 0 0 0;
  }
`

const BadgesSection = styled.div`
  display: flex;
  flex-flow: wrap;

  & > * {
    margin: 0 8px 8px 0;
  }
`

const AuthorsSection = styled.div`
  display: flex;
  flex-flow: wrap;

  & > * {
    margin: 0 8px 8px 0;
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
    }
  }
`

interface ArticlesJumboProps {
  bubblesImg: Image
  authors: Author[]
}

const ArticlesJumbo = ({ bubblesImg, authors }: ArticlesJumboProps) => {
  const filtersModal = useModal()
  const seniorityLevels = Object.entries(SeniorityLevel)

  return (
    <>
      {filtersModal.isOpen && (
        <Modal onClose={filtersModal.close}>
          <FiltersModal>
            <XL>Filters</XL>

            <M className="diff-level-heading">Difficulty levels</M>

            <Badge className="diff-badge" key="all" color={theme.secondary}>
              All {Object.values(SeniorityLevel).join(" ")}
            </Badge>

            <Divider className="articles-jumbo-divider" horizontal />

            <BadgesSection>
              {seniorityLevels.map(([key, emoji]) => (
                <Badge className="diff-badge" key={key} color={theme.secondary}>
                  {key} {emoji}
                </Badge>
              ))}
            </BadgesSection>

            <M className="authors-heading">Authors</M>

            <Divider className="articles-jumbo-divider" horizontal />

            <AuthorsSection>
              {authors.map(author => (
                <AuthorAvatar
                  key={author.id}
                  alt={author.firstName + "" + author.lastName}
                  title={author.firstName + "" + author.lastName}
                  size="small"
                  avatar={author.avatar}
                />
              ))}
            </AuthorsSection>
          </FiltersModal>
        </Modal>
      )}
      <Container>
        <Img
          fluid={bubblesImg}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
        <Wrapper>
          <XXL>Find something interesting to read</XXL>
          <M>
            When writing our articles, we place great emphasis on the{" "}
            <B>quality</B> of their content and teaching materials. Thanks to
            this you will be able to find <B>meaningful materials</B> and
            understand <B>complex issues</B>.
          </M>
          <InputWrapper>
            <Input placeholder="Type to find an article..." />
            <IconButton className="filter-button" onClick={filtersModal.open}>
              <FilterIcon />
            </IconButton>
          </InputWrapper>

          <Divider className="articles-jumbo-divider" horizontal />
          <Footer>
            <Link to="/blog-creator/">
              <Button>Create yours</Button>
            </Link>
          </Footer>
        </Wrapper>
      </Container>
    </>
  )
}

export { ArticlesJumbo }
