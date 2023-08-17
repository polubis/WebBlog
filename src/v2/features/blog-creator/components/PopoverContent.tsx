import React from 'react'
import styled from 'styled-components'
import { PopoverContentProps } from './models'

const Container = styled.div`
    .popover-content-wrapper {
        margin: 20px 0 24px 0;

        & > *:not(:last-child) {
            margin-bottom: 12px;
        }
    }

    .popover-content-footer {
        justify-content: flex-end;

        & > * {
            margin-left: 12px;
        }
    }
`

const PopoverContent = ({ children }: PopoverContentProps) => {
    const [Content, Footer] = children
    
    return (
        <Container className='col'>
            <div className='popover-content-wrapper'>
                {Content}
            </div>
            <div className='popover-content-footer row'>
                {Footer}
            </div>
        </Container>
    )
}

export { PopoverContent }