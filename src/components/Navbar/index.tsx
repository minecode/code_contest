import React, { useEffect } from 'react'
import Authentication from '../Authentication'
import { useSelector } from 'react-redux'
import { Container, Avatar, UserInfo, Auth } from './Navbar'
import { Data } from '../Interface'
import Switch from 'react-switch'
import { shade } from 'polished'
import usePeristedState from '../../hooks/usePersistedState'

const Navbar: React.FC = () => {
	const dataAuth = useSelector((state: Data) => state.data.auth)
	const [theme, setTheme] = usePeristedState('theme', 'dark')
	useEffect(() => {
		if (theme === 'light') {
			document.documentElement.classList.toggle('light')
		}
	}, [])
	return (
		<Container>
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
						setTheme(theme === 'light' ? 'dark' : 'light')
					}}
					checked={theme === 'light'}
					checkedIcon={false}
					uncheckedIcon={false}
					height={10}
					width={40}
					handleDiameter={20}
					offColor={shade(0.5, 'rgb(32, 34, 37)')}
					onColor={'#6e86d6'}
				/>
			) : (
				<></>
			)}
		</Container>
	)
}

export default Navbar
