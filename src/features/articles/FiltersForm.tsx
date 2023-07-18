import React, { ReactNode } from "react"
import { M, Modal, XL, useModal } from "../../ui"
import AuthorAvatar from "../../components/article/AuthorAvatar"
import Divider from "../../components/divider/Divider"
import Badge from "../../components/article/Badge"
import { SecondaryButton } from "../../components/button/Button"
import { useArticlesProvider } from "./ArticlesProvider"
import styled from "styled-components"
import theme from "../../utils/theme"
import { Author, SeniorityLevel } from "../../models"

const FiltersModal = styled.div`
  .diff-level-heading {
    margin: 20px 0 12px 0;
  }

  .divider {
    margin: 20px 0;
  }

  .clickable {
    cursor: pointer;
    user-select: none;

    &:hover {
      opacity: 0.8;
    }
  }

  .filters-form-authors-section {
    & > * {
      margin: 0 8px 8px 0;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
    }

    .authors-section-avatar {
      border: 2px solid transparent;

      &.active {
        border: 2px solid ${theme.primary};
      }
    }
  }

  .authors-badge {
    span {
      display: block;
      margin-right: 4px;
    }

    .author-avatar {
      margin-right: 4px;
    }
  }

  .authors-heading {
    margin: 20px 0 12px 0;
  }

  .filters-form-footer {
    margin-top: 32px;
    justify-content: flex-end;

    & > *:not(:last-child) {
      margin-right: 12px;
    }
  }

  .diff-badge {
    &.active {
      border-color: 1px solid ${theme.primary};
    }
  }
`

const BadgesSection = styled.div`
  & > * {
    margin: 0 8px 8px 0;
  }
`

interface FiltersFormProps {
  authors: Author[]
  trigger: (modal: ReturnType<typeof useModal>) => ReactNode
}

const AUTHORS_DISPLAY_LIMIT = 4

const FiltersForm = ({ authors, trigger }: FiltersFormProps) => {
  const modal = useModal()
  const {
    filters,
    allAuthorsSelected,
    allSeniorityLevelsSelected,
    changed,
    setAllAuthors,
    reset,
    changeSeniority,
    changeAuthor,
    setAllSeniorityLevels,
  } = useArticlesProvider()

  const seniorityLevels = Object.entries(SeniorityLevel)

  return (
    <>
      {trigger(modal)}

      {modal.isOpen && (
        <Modal maxWidth="500px" onClose={modal.close}>
          <FiltersModal className="col">
            <XL>Filters</XL>

            <M className="diff-level-heading">Difficulty levels</M>

            <BadgesSection className="wrap">
              <Badge
                className="clickable"
                key="all"
                color={
                  allSeniorityLevelsSelected ? theme.primary : theme.secondary
                }
                onClick={() => setAllSeniorityLevels()}
              >
                All {Object.values(SeniorityLevel).join(" ")}
              </Badge>
              {seniorityLevels.map(([key, emoji]) => (
                <Badge
                  className="clickable"
                  key={key}
                  color={
                    filters.seniorityLevels[key]
                      ? theme.primary
                      : theme.secondary
                  }
                  onClick={() => changeSeniority(key)}
                >
                  {key} {emoji}
                </Badge>
              ))}
            </BadgesSection>

            <M className="authors-heading">Authors</M>

            <Badge
              className="authors-badge row clickable"
              key="all"
              color={allAuthorsSelected ? theme.primary : theme.secondary}
              onClick={() => setAllAuthors()}
            >
              <span>All ({authors.length})</span>
              {authors.slice(0, AUTHORS_DISPLAY_LIMIT).map(author => (
                <AuthorAvatar
                  key={author.id}
                  avatar={author.avatar.tiny.fixed}
                />
              ))}
              <span>... +{authors.length - AUTHORS_DISPLAY_LIMIT}</span>
            </Badge>

            <Divider className="divider" horizontal />

            <section className="filters-form-authors-section wrap">
              {authors.map(author => (
                <div
                  key={author.id}
                  onClick={() => changeAuthor(author.id)}
                >
                  <AuthorAvatar
                    className={`authors-section-avatar${filters.authors[author.id] ? " active" : ""
                      }`}
                    avatar={author.avatar.small.fixed}
                  />
                </div>

              ))}
            </section>

            <footer className="filters-form-footer row">
              <SecondaryButton disabled={!changed} onClick={reset}>
                Reset
              </SecondaryButton>
              <SecondaryButton onClick={modal.close}>Ok</SecondaryButton>
            </footer>
          </FiltersModal>
        </Modal>
      )}
    </>
  )
}

export { FiltersForm }
