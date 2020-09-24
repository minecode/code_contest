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
								window.location.href = process.env.NEXT_PUBLIC_AWS_LOGIN || 'null'
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
