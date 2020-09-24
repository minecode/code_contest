
import styled from 'styled-components'
import { Login } from 'styled-icons/material'

export const LoginInfo = styled.div`
    text-align: center;
    padding: 20px;
    color: var(--gray);
`

export const LoginMessage = styled.div`
    margin-right: 15px;
    margin-left: 15px;
`

export const LoginButton = styled.button`
    @media (min-width: 1024px) {
        width: 165px;
        > span {
            display: initial !important;
        }
    }
    margin:5px;
    width: 65px;
    height: 35px;
    border-radius: 4px;
    background: var(--link);
    color:white;
    border:0px transparent;
    text-align: center;
    &:hover {
        background: var(--discord)
    }
    > span {
        display: none;
    }
    
`

export const LoginIcon = styled(Login)`
    width: 20px;
    height: 20px;
    color: var(--white);
`
