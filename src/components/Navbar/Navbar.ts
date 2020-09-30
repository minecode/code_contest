import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Dashboard as ds } from '@styled-icons/material-outlined/Dashboard'
import { Logout } from 'styled-icons/heroicons-outline'
import { Login, Home } from 'styled-icons/material'

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
	justify-content: flex-end;
`

export const Dashboard = styled.button`
	@media (min-width: 1024px) {
		width: 165px;
		> span {
			display: initial !important;
		}
	}
	margin: 5px;
	width: 35px;
	height: 35px;
	border-radius: 4px;
	background: var(--link);
	color: white;
	border: 0px transparent;
	text-align: center;
	&:hover {
		background: var(--discord);
		text-decoration: none;
		color: var(--white);
	}
	> span {
		display: none;
	}
	color: var(--white);
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
`

export const LogoutButton = styled.button`
	@media (min-width: 1024px) {
		width: 165px;
		> span {
			display: initial !important;
		}
	}
	margin: 5px;
	width: 65px;
	height: 35px;
	border-radius: 4px;
	background: var(--link);
	color: white;
	border: 0px transparent;
	text-align: center;
	&:hover {
		background: var(--discord);
	}
	> span {
		display: none;
	}
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
`

export const LoginButton = styled.button`
	@media (min-width: 1024px) {
		width: 165px;
		> span {
			display: initial !important;
		}
	}
	margin: 5px;
	width: 65px;
	height: 35px;
	border-radius: 4px;
	background: var(--link);
	color: white;
	border: 0px transparent;
	text-align: center;
	&:hover {
		background: var(--discord);
	}
	> span {
		display: none;
	}
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
`

export const DashboardIcon = styled(ds)`
	width: 20px;
	height: 20px;
	margin-left: 10px;
	color: var(--white);
	cursor: pointer;
`

export const LogoutIcon = styled(Logout)`
	width: 20px;
	height: 20px;
	color: var(--white);
	margin-left: 10px;
	cursor: pointer;
`

export const LoginIcon = styled(Login)`
	width: 20px;
	height: 20px;
	color: var(--white);
	margin-left: 10px;
	cursor: pointer;
`

export const HomeIcon = styled(Home)`
	width: 20px;
	height: 20px;
	color: var(--white);
	margin-left: 10px;
	cursor: pointer;
`
