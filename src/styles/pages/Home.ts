import styled from 'styled-components'

export const Grid = styled.div`
	display: grid;
	grid-template-columns: auto 70%;
	grid-template-rows: 46px auto auto auto;
	grid-template-areas:
		'LG LG'
		'CL CI'
		'CL CD'
		'CL DF';
	@media (min-width: 1024px) {
		grid-template-columns: 20% 65% 15%;
		grid-template-rows: 46px auto auto auto;
		grid-template-areas:
			'LG LG LG'
			'CL CI UL'
			'CL CD UL'
			'CL DF UL';
	}
	@media (min-width: 1366px) {
		grid-template-columns: 20% 60% 20%;
	}
	height: 100vh;
`

export const Container = styled.div`
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	background-color: var(--primary);
	max-height: calc(100vh - 46px);
	overflow-y: scroll;
	::-webkit-scrollbar {
		width: 4px;
	}
	::-webkit-scrollbar-thumb {
		background-color: var(--tertiary);
		border-radius: 4px;
	}
	::-webkit-scrollbar-track {
		background-color: var(--secondary);
	}
`
