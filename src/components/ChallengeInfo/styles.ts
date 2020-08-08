import styled from 'styled-components'

export const ContainerDescription = styled.div`
    grid-area: CD;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: var(--primary);
`

export const Info = styled.div`
    padding: 30px;
    display: flex;
    flex-direction: column;
    color: var(--white);
    ::-webkit-scrollbar {
        width: 8px;
    }
    ::-webkit-scrollbar-thumb {
        background-color: var(--tertiary);
        border-radius: 4px;
    }
    ::-webkit-scrollbar-track {
        background-color: var(--secondary);
    }
`

export const ContainerInfo = styled.div`
    grid-area: CI;
    display: flex;
    align-items: center;
    padding: 0 17px;
    background-color: var(--primary);
    box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 0px 0px;
    z-index: 2;
`

export const Title = styled.h1`
    margin-left: 9px;
    font-size: 16px;
    font-weight: bold;
    color: var(--white);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`

export const Separator = styled.div`
    height: 24px;
    width: 1px;
    background-color: var(--white);
    opacity: 0.2;
    margin: 0 13px;
`