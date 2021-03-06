import styled from 'styled-components'

export const Container = styled.div`
	@media (min-width: 1024px) {
		grid-area: UL;
		display: flex;
		flex-direction: column;
		padding: 3px 6px 0 16px;
		background-color: var(--secondary);
		max-height: calc(100vh - 46px);
		overflow-y: scroll;
		::-webkit-scrollbar {
			display: none;
		}
		-ms-overflow-style: none;
		scrollbar-width: none;
		text-align: center;
		> div {
			justify-content: center;
		}
	}
	@media (min-width: 1366px) {
		text-align: left;
		> div {
			justify-content: initial;
		}
	}
	display: none;
`

export const Role = styled.span`
	margin-top: 20px;
	text-transform: uppercase;
	font-size: 12px;
	font-weight: 500;
	color: var(--gray);
`

export const User = styled.div`
	margin-top: 5px;
	padding: 5px;
	display: flex;
	align-items: center;
	cursor: pointer;
	border-radius: 4px;
	background: transparent;
	transition: background 0.2s;
	&:hover {
		background: var(--quinary);
	}

	> strong {
		display: none;
	}

	@media (min-width: 1366px) {
		> strong {
			display: initial;
			margin-left: 13px;
			font-weight: 500;
			color: var(--white);
			opacity: 0.7;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}
	}

	> span {
		margin-left: 9px;
		background-color: var(--discord);
		color: var(--white);
		border-radius: 4px;
		padding: 4px 5px;
		text-transform: uppercase;
		font-weight: bold;
		font-size: 11px;
	}
`

export const Avatar = styled.img`
	width: 32;
	height: 32px;
	flex-shrink: 0;
	border-radius: 50%;
	background: var(--gray);
	margin: 0 0 0 0px;
`
