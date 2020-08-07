import styled from 'styled-components'

export const Auth = styled.div`
    grid-area: LG;

    background-color: var(--tertiary);
`
export const BtnGoogle = styled.button`
    margin:5px;
    width: 165px;
    height:35px;
    border-radius: 4px;
    background: var(--link);
    color:white;
    border:0px transparent;
    text-align: center;

    &:hover {
        background: var(--discord)
    }
    
`
