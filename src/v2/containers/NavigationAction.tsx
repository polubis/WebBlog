import React from 'react'
import styled from 'styled-components'
import { LanguageLinks } from './LanguageLinks'
import { L_UP } from '../../utils/viewport'
import { JoinUsLink } from './JoinUsLink'

const Container = styled.div`
    .language-links {
        display: none;

        @media ${L_UP} {
            display: flex;
            top: 0;
            bottom: 0;
            margin: auto 0;
            position: absolute;
            right: 20px;
        }
    }
`

const NavigationAction = () => {
    return (
        <Container className="row">
            <JoinUsLink />
            <LanguageLinks />
        </Container>
    )
}

export { NavigationAction }