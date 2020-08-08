import styled from 'styled-components'

export const Grid = styled.div`
    display: grid;
    grid-template-columns: 311px auto;
    grid-template-rows: 46px auto;
    grid-template-areas:
        'LG LG'
        'CL C';
    @media (min-width: 1024px) {
        grid-template-columns: 311px auto 311px;
        grid-template-rows: 46px auto;
        grid-template-areas:
            'LG LG LG'
            'CL C UL';
    }
    height: 100vh;
`;
