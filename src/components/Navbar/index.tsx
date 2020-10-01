import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	Container,
	Avatar,
	UserInfo,
	Dashboard,
	DashboardIcon,
	LogoutButton,
	LogoutIcon,
	LoginButton,
	LoginIcon,
	HomeIcon
} from './Navbar'
import { Data } from '../Interface'
import Switch from 'react-switch'
import { shade } from 'polished'
import usePersistedState from '../../hooks/usePersistedState'
import { ReCaptcha } from 'react-recaptcha-v3'
import { useRouter } from 'next/router'

const Navbar: React.FC = () => {
	const dispatch = useDispatch()
	const data = useSelector((state: Data) => state.data)
	const auth_var = useSelector((state: Data) => state.data.auth)
	const [loggedIn, setLoggedIn] = usePersistedState('loggedIn', false)
	const [accessToken, setAccessToken] = usePersistedState('access_token', '')
	const [refreshToken, setRefreshToken] = usePersistedState(
		'refresh_token',
		''
	)
	const [idToken, setIdToken] = usePersistedState('user_info', null)
	const [theme, setTheme] = usePersistedState('theme', 'dark')

	useEffect(() => {
		if (theme === 'light') {
			document.documentElement.classList.add('light')
			document.documentElement.classList.remove('dark')
		} else if (theme === 'dark') {
			document.documentElement.classList.remove('light')
			document.documentElement.classList.add('dark')
		}
	}, [])

	const router = useRouter()

	const verifyCallback = recaptchaToken => {
		// Here you will get the final recaptchaToken!!!
		// console.log(recaptchaToken, '<= your recaptcha token')
	}

	const logout = () => {
		setIdToken('')
		setAccessToken('')
		setRefreshToken('')
		setLoggedIn(false)
	}

	return (
		<Container>
			<ReCaptcha
				sitekey="6LewbMwZAAAAAAeKjMMbilsGbBNGC5IRrdrXe-v9"
				action="string"
				verifyCallback={verifyCallback}
			/>
			{loggedIn ? (
				<div
					style={{
						display: 'flex',
						flex: 1,
						justifyContent: 'space-between'
					}}
				>
					<UserInfo>
						<span>Welcome, {idToken.given_name}!</span>
						<Avatar src={idToken.picture} style={{objectFit: 'cover'}}/>
					</UserInfo>
					<div style={{ display: 'flex' }}>
						<Dashboard
							onClick={() => {
								location.pathname.includes('dashboard')
									? router.push('/')
									: router.push('/dashboard')
							}}
						>
							<span>
								{location.pathname.includes('dashboard')
									? 'Home '
									: 'Dashboard '}
							</span>
							<DashboardIcon />
						</Dashboard>
						<LogoutButton
							onClick={() => {
								logout()
							}}
						>
							<span>Logout</span>
							<LogoutIcon />
						</LogoutButton>
					</div>
				</div>
			) : (
				<div
					style={{
						display: 'flex',
						flex: 1,
						justifyContent: 'flex-end'
					}}
				>
					<LoginButton
						onClick={() => {
							location.pathname.includes('authenticate')
								? router.push('./')
								: router.push('./authenticate')
						}}
					>
						<span>
							{location.pathname.includes('authenticate')
								? 'Home'
								: 'Login'}
						</span>
						{location.pathname.includes('authenticate') ? (
							<HomeIcon />
						) : (
							<LoginIcon />
						)}
					</LoginButton>
				</div>
			)}
			{theme ? (
				<Switch
					onChange={() => {
						document.documentElement.classList.toggle('light')
						document.documentElement.classList.toggle('dark')
						setTheme(theme === 'light' ? 'dark' : 'light')
					}}
					checked={theme === 'light'}
					checkedIcon={false}
					uncheckedIcon={false}
					height={10}
					width={40}
					handleDiameter={20}
					offColor={shade(0.15, '#36393f')}
					onColor={shade(0.15, '#e1e1e1')}
				/>
			) : (
				<></>
			)}
		</Container>
	)
}

export default Navbar
