import styled from 'styled-components'

export const Container = styled.div`
	grid-area: 2 / 1 / 5 / 3;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	background-color: var(--primary);
	max-height: calc(100vh - 46px);
	@media (min-width: 1024px) {
		grid-area: 2 / 1 / 4 / 5;
		grid-template-areas:
			'LG LG LG'
			'CL CI UL'
			'CL CI UL'
			'CL DF UL';
	}
`

export const Form = styled.div`

	padding: 5% 20%;

`
