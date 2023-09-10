import React from 'react'
import styled from 'styled-components'
import type { TabsProps } from './models'

const Container = styled.div`
    & > * {
        padding: 4px 8px;

        &:first-child {
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
        }

        &:last-child {
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
        }
    }
`

const Tabs = ({ className, children }: TabsProps) => {
    return (
        <Container className={`tabs row ${className}`}>{children}</Container>
    )
}


export { Tabs, }

