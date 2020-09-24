import React, { useEffect, useState } from 'react'
import auth from '../../services/auth'
import base64 from 'base-64'
import { useRouter } from 'next/router'

const Authentication: React.FC = () => {
	const router = useRouter()
	const [access_token, setAccess_token] = useState<string>()
	const [refresh_token, setRefresh_token] = useState<string>()

	const getCode = (code: string) => {
		const params = new URLSearchParams()
		params.append('grant_type', 'authorization_code')
		params.append('client_id', '4s0k4rrrggv6utvjbq8fsbb2jj')
		params.append('redirect_uri', 'http://localhost:3000/authenticate')
		params.append('code', code)
		auth.post('/oauth2/token', params)
			.then(function (response) {
				// handle success
				if (
					response.data?.access_token &&
					response.data?.refresh_token
				) {
					setAccess_token(base64.encode(response.data.access_token))
					setRefresh_token(response.data.refresh_token)
				}
			})
			.catch(function (error) {
				// handle error
				console.log('Error ', error)
			})
	}

	const setData = (dataResponse: any) => {
		localStorage.setItem(
			'auth',
			JSON.stringify({
				authenticated: true,
				user: {
					id: dataResponse.data.email,
					name: dataResponse.data.name.split(' ').shift(),
					surname: dataResponse.data.name.split(' ').pop(),
					image: dataResponse.data.picture
				},
				token: access_token ? access_token : ''
			})
		)
		router.push('/')
	}

	useEffect(() => {
		if (access_token) {
			auth.get('/oauth2/userInfo', {
				headers: {
					Authorization: 'Bearer ' + base64.decode(access_token)
				}
			})
				.then(function (responseInfo) {
					setData(responseInfo)
				})
				.catch(function (errorInfo) {
					console.log(errorInfo)
				})
		}
	}, [access_token])

	useEffect(() => {
		const params = new URLSearchParams(window.location.search)
		const code = params.get('code')
		if (code) {
			getCode(code)
		}
	}, [])

	return (
		<>
			<p>Redirecting...</p>
		</>
	)
}

export default Authentication
