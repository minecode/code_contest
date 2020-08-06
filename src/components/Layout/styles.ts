import styled from 'styled-components';

export const Grid = styled.div`
	display: grid;

	grid-template-columns: auto 311px;
	grid-template-rows: 46px auto;

	grid-template-areas:
		'LG LG'
		'C C';

	@media (min-width: 1024px) {
		grid-template-areas:
			'LG LG'
			'C UL';
	}

	height: 100vh;
`;
