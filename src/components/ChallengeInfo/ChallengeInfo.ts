import styled from 'styled-components'

export const ContainerDescription = styled.div`
	grid-area: CD;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	background-color: var(--primary);
	width: 100%;
`

export const Info = styled.div`
	padding: 30px;
	display: flex;
	flex-direction: column;
	color: var(--white);
`

export const ContainerInfo = styled.div`
	grid-area: CI;
	/* display: flex; */
	align-items: center;
	padding: 0 17px;
	background-color: var(--primary);
	box-shadow: var(--secondary) 0px 1px 0px 0px;
	z-index: 2;
	/* min-height: 46px; */
	flex-direction: column;

	display: grid;
	grid-template-columns: 100%;
	grid-template-rows: 46px auto auto auto;
	grid-template-areas:
		'T'
		'CD'
		'CD'
		'CD';
`

export const Title = styled.h1`
	grid-area: T;
	margin-left: 9px;
	font-size: 16px;
	font-weight: bold;
	color: var(--white);
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	text-align: center;
`
