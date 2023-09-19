import React from 'react'
import styled from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'
import { useLayoutProvider } from '../providers/LayoutProvider'
import AuthorAvatar from '../../components/article/AuthorAvatar'
import { M, S } from '../../ui'
import type { AuthorSectionProps } from './models'
import { M_DOWN } from '../../utils/viewport'
import { AddVoteSection } from './AddVoteSection'

const Container = styled.div`
    & > *:first-child {
      margin-right: 32px;
    }

    @media ${M_DOWN} {
      justify-content: space-between;

      & > *:first-child {
        margin-right: 16px;
      }
    }

    .author-avatar {
      flex-shrink: 0;
    }

    .author-personality {
        margin-left: 16px;
    }
`

const AuthorSection = ({ role, fullName, avatar, path }: AuthorSectionProps) => {
    const layout = useLayoutProvider()

    return (
        <Container className="author-section row">
            <GatsbyLink to={layout.routes.authors.to}>
                <div className="clickable row">
                    <AuthorAvatar
                        avatar={avatar}
                        avatarTitle={fullName}
                    />
                    <div className="author-personality col">
                        <M bold>
                            {fullName}
                        </M>
                        <S >{role}</S>
                    </div>
                </div>
            </GatsbyLink>
            <AddVoteSection path={path} />
        </Container>
    )
}

export { AuthorSection }