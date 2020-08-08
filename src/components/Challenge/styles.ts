import styled from 'styled-components'

export const Container = styled.div`
    grid-area: C;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: var(--primary);
    max-height: calc(100vh - 46px);
    overflow-y: scroll;
`

export const Grid = styled.div`
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: 46px auto auto;
    grid-template-areas:
        'CI'
        'CD'
        'DF';
    height: 100vh;
`