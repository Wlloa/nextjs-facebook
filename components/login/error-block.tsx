import React from 'react'
import styled from 'styled-components'
import { StyledProps } from '../../common/props-interface'

export interface ErrorProps extends StyledProps {
    title?: string;
    text?: string;
}

const ErrorBlock = (props: ErrorProps) => {
    const {title, text, className} = props
    return (
        <div className={className}>
            {title && <h3>{title}</h3>}
            {text && <p>{text}</p>}
        </div>
    )
}

export const StyledErrorBlock = styled(ErrorBlock)`
    background-color: #ffebe8;
    border: 1px solid #dd3c10;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
     h3 {
         color: #333;
         font-weight: 700;
         font-size: 14px;
         text-align: center;
         line-height: 1.34;
     }

     p{
        font-size: 12px;
        color: #1c1e21;
        line-height: 1.34;
     }

     @media (max-width: 767px){
         margin: 0 16px;
     }
`;