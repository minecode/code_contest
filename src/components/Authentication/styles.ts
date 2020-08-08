import styled from 'styled-components'
import { Logout } from 'styled-icons/heroicons-outline'
import { Login } from 'styled-icons/material'

export const Auth = styled.div`
    grid-area: LG;
    background-color: var(--tertiary);
`
export const BtnGoogle = styled.button`
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
export const LogoutIcon = styled(Logout)`
    width: 20px;
    height: 20px;
    color: var(--white);
`

export const LoginIcon = styled(Login)`
    width: 20px;
    height: 20px;
    color: var(--white);
`