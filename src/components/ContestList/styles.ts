import styled from 'styled-components'

export const ContainerList = styled.div`
    grid-area: CL;
    display: flex;
    flex-direction: column;
    padding: 24px 9.5px 0 16px;
    background-color: var(--secondary);
    overflow-y: scroll;
    ::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
`
export const Category = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 6px;
    > span {
        text-transform: uppercase;
        font-size: 12px;
        font-weight: 500;
        color: var(--gray);
    }
`
