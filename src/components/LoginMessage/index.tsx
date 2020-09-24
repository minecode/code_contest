import React from 'react'
import { Col, Row } from 'react-bootstrap'
import {
	LoginInfo,
	LoginMessage as LM,
	LoginButton,
	LoginIcon
} from './LoginMessage'

const LoginMessage: React.FC = () => {
	return (
		<LM>
			<Row>
				<Col xs={12} className="text-center">
					<LoginInfo>
						You need to{' '}
						<LoginButton
							onClick={() => {
								window.location.href = `https://codecontestf6f8446e-f6f8446e-dev.auth.us-east-1.amazoncognito.com/login?client_id=4s0k4rrrggv6utvjbq8fsbb2jj&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=http://localhost:3000/authenticate`
							}}
						>
							Login <LoginIcon />
						</LoginButton>
						to send your solution!
					</LoginInfo>
				</Col>
			</Row>
		</LM>
	)
}

export default LoginMessage
