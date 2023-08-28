import React, { ReactNode } from "react"
import styled from "styled-components"
import theme from "../../../../utils/theme"
import { M, Modal, XL, useModal } from "../../../../ui"
import { Seniority } from "../../../core/models"
import { useArticlesFiltersProvider } from "../ArticlesFiltersProvider"
import Badge from "../../../../components/article/Badge"
import AuthorAvatar from "../../../../components/article/AuthorAvatar"
import Divider from "../../../../components/divider/Divider"
import { SecondaryButton } from "../../../../components/button/Button"
import { useLayoutProvider } from "../../../providers/LayoutProvider"
import {
  ArticlesPageProvider,
  useArticlesPageProvider,
} from "../ArticlesPageProvider"

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
      flex-shrink: 0;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
    }

    .authors-section-avatar {
      width: 50px;
      height: 50px;

      &.active {
        outline: 2px solid ${theme.primary};
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
  trigger: (modal: ReturnType<typeof useModal>) => ReactNode
}

const AUTHORS_DISPLAY_LIMIT = 4

const FiltersForm = ({ trigger }: FiltersFormProps) => {
  const { t: layoutT } = useLayoutProvider()
  const { t: articlesPageT, authors } = useArticlesPageProvider()
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
  } = useArticlesFiltersProvider()

  const seniorityLevels = Object.entries(Seniority)

  return (
    <>
      {trigger(modal)}

      {modal.isOpen && (
        <Modal maxWidth="500px" onClose={modal.close}>
          <FiltersModal className="col">
            <XL>{articlesPageT.filters}</XL>

            <M className="diff-level-heading">{articlesPageT.diff_levels}</M>

            <BadgesSection className="wrap">
              <Badge
                className="clickable"
                key="all"
                color={
                  allSeniorityLevelsSelected ? theme.primary : theme.secondary
                }
                onClick={() => setAllSeniorityLevels()}
              >
                {articlesPageT.all}{" "}
                {Object.values(Seniority)
                  .map(seniority => layoutT[seniority])
                  .join(" ")}
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
                  {layoutT[key]} {emoji}
                </Badge>
              ))}
            </BadgesSection>

            <M className="authors-heading">{layoutT.authors}</M>

            <Badge
              className="authors-badge row clickable"
              key="all"
              color={allAuthorsSelected ? theme.primary : theme.secondary}
              onClick={() => setAllAuthors()}
            >
              <span>
                {articlesPageT.all} ({authors.length})
              </span>
              {authors.slice(0, AUTHORS_DISPLAY_LIMIT).map(author => (
                <AuthorAvatar
                  key={author.id}
                  avatar={author.avatar.tiny}
                  avatarTitle={author.full_name}
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
                  className={`circle authors-section-avatar${
                    filters.authors[author.id] ? " active" : ""
                  }`}
                >
                  <AuthorAvatar
                    avatar={author.avatar.small}
                    avatarTitle={author.full_name}
                  />
                </div>
              ))}
            </section>

            <footer className="filters-form-footer row">
              <SecondaryButton disabled={!changed} onClick={reset}>
                {articlesPageT.reset}
              </SecondaryButton>
              <SecondaryButton onClick={modal.close}>
                {articlesPageT.ok}
              </SecondaryButton>
            </footer>
          </FiltersModal>
        </Modal>
      )}
    </>
  )
}

export { FiltersForm }
