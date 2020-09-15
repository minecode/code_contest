import React, { useEffect } from 'react'
import Authentication from '../Authentication'
import { useSelector } from 'react-redux'
import { Container, Avatar, UserInfo, Auth } from './Navbar'
import { Data } from '../Interface'
import Switch from 'react-switch'
import { shade } from 'polished'
import usePeristedState from '../../hooks/usePersistedState'
import { ReCaptcha } from 'react-recaptcha-v3'

const Navbar: React.FC = () => {
	const dataAuth = useSelector((state: Data) => state.data.auth)
	const [theme, setTheme] = usePeristedState('theme', 'dark')
	useEffect(() => {
		if (theme === 'light') {
			document.documentElement.classList.add('light')
			document.documentElement.classList.remove('dark')
		} else if (theme === 'dark') {
			document.documentElement.classList.remove('light')
			document.documentElement.classList.add('dark')
		}
	}, [])

	const verifyCallback = recaptchaToken => {
		// Here you will get the final recaptchaToken!!!
		console.log(recaptchaToken, '<= your recaptcha token')
	}

	return (
		<Container>
			<ReCaptcha
				sitekey="6LewbMwZAAAAAAeKjMMbilsGbBNGC5IRrdrXe-v9"
				action="string"
				verifyCallback={verifyCallback}
			/>
			{dataAuth.authenticated ? (
				<UserInfo>
					<span>Welcome, {dataAuth.user.name}!</span>
					<Avatar src={dataAuth.user.image} />
				</UserInfo>
			) : (
				<></>
			)}
			<Auth>
				<Authentication />
			</Auth>
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
