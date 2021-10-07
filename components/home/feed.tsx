import React from 'react'
import styled from 'styled-components'
import { StyledProps } from '../../common/props-interface'

const Feed = ({className}: StyledProps): JSX.Element => {
    return (
        <div className={className}>
            
        </div>
    )
}


export const MainFeed = styled(Feed)`
    min-height: calc(100vh - 56px);
    overflow-y: auto;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    flex-basis: 744px;
    align-items: stretch;
    padding: 0 32px;
    flex-grow: 1;
    z-index: 0;
`;