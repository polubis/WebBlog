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
  display: flex;
  flex-flow: column;
  max-width: 400px;

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
    display: flex;
    flex-flow: wrap;

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
    display: flex;
    align-items: center;

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
    display: flex;
    align-items: center;
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
  display: flex;
  flex-flow: wrap;

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
        <Modal onClose={modal.close}>
          <FiltersModal>
            <XL>Filters</XL>

            <M className="diff-level-heading">Difficulty levels</M>

            <BadgesSection>
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
              className="authors-badge clickable"
              key="all"
              color={allAuthorsSelected ? theme.primary : theme.secondary}
              onClick={() => setAllAuthors()}
            >
              <span>All ({authors.length})</span>
              {authors.slice(0, AUTHORS_DISPLAY_LIMIT).map(author => (
                <AuthorAvatar
                  key={author.id}
                  alt={author.firstName + "" + author.lastName}
                  title={author.firstName + "" + author.lastName}
                  size="tiny"
                  avatar={author.avatar}
                />
              ))}
              <span>... +{authors.length - AUTHORS_DISPLAY_LIMIT}</span>
            </Badge>

            <Divider className="divider" horizontal />

            <section className="filters-form-authors-section">
              {authors.map(author => (
                <AuthorAvatar
                  className={`authors-section-avatar${
                    filters.authors[author.id] ? " active" : ""
                  }`}
                  key={author.id}
                  alt={author.firstName + "" + author.lastName}
                  title={author.firstName + "" + author.lastName}
                  size="small"
                  avatar={author.avatar}
                  onClick={() => changeAuthor(author.id)}
                />
              ))}
            </section>

            <footer className="filters-form-footer">
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
