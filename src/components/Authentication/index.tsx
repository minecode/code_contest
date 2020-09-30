import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Login from '../Login'
import Register from '../Register'
import Forgot from '../Forgot'
import Validate from '../Validate'
import { Container, Form } from '../../styles/pages/authenticate'
import { Typography, Row, Col, Alert } from 'antd'
import usePersistedState from '../../hooks/usePersistedState'

const { Title } = Typography

const Authentication: React.FC = () => {
	const router = useRouter()
	const [access_token, setAccess_token] = useState<string>()
	const [refresh_token, setRefresh_token] = useState<string>()
	const [state, setState] = useState<string>('login')

  const [loggedIn, setLoggedIn] = usePersistedState('loggedIn', false)
	

	return (
		<Container>
			{!loggedIn && <Form>
				<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
					<Col xs={24} sm={24} md={12} lg={12} xl={12}>
						<Row justify='start'>
							<Title style={{color: 'var(--gray)'}}>
								Login
							</Title>
						</Row>
						<Row style={{minWidth: '100%'}}>
								<Login setState={setState}/>
						</Row>
					</Col>
					<Col xs={24} sm={24} md={12} lg={12} xl={12}>
						{state === 'validate_code' ? 
						<>
							<Row justify='start'>
								<Title style={{color: 'var(--gray)'}}>
									Validate code
								</Title>
							</Row>
							<Row style={{minWidth: '100%'}}>
									<Validate setState={setState} />
							</Row>
						</> 
						: state === 'success_code' ? 
						<>
							<Row justify='start'>
								<Title style={{color: 'var(--gray)'}}>
									Validate code
								</Title>
							</Row>
							<Row style={{minWidth: '100%'}}>
								<Alert
									style={{minWidth: '100%'}}
									message="Success"
									description="Your validation code has been introduced with success! You can now login with your account"
									type="success"
									showIcon
								/>
							</Row>
						</>
					 	:
						<>
							<Row justify='start'>
								<Title style={{color: 'var(--gray)'}}>
									Register
								</Title>
							</Row>
							<Row style={{minWidth: '100%'}}>
									<Register setState={setState} />
							</Row>
						</>
						}
					</Col>
				</Row>
			</Form>}
		</Container>
	)
}

export default Authentication
