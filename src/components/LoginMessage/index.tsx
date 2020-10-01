import React from 'react'
import { Col, Row } from 'react-bootstrap'
import {
	LoginInfo,
	LoginMessage as LM,
	LoginButton,
	LoginIcon
} from './LoginMessage'
import { useRouter } from 'next/router'

const LoginMessage: React.FC = () => {
	const router = useRouter()

	return (
		<LM>
			<Row>
				<Col xs={12} className="text-center">
					<LoginInfo>
						You need to{' '}
						<LoginButton
							onClick={() => {
							router.push('/authenticate')
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
