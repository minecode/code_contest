import styled from 'styled-components'

export const Container = styled.div`
    grid-area: LG;
    flex: 1;
    display: flex;
    align-items: center;
    color: var(--white);
    background-color: var(--tertiary);
    padding: 20px;
`

export const UserInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const Avatar = styled.img`
    width: 39px;
    height: 39px;
    flex-shrink: 0;
    border-radius: 50%;
    background: var(--gray);
    margin: 0 0 0 20px;
`
export const Auth = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end  
`
