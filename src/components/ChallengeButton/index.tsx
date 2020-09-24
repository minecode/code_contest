import React from 'react'
import { Data } from '../Interface'
import { titleCase } from '../Utils'
import { useSelector } from 'react-redux'
import { Container, HashtagIcon, CheckIcon, Challenge } from './ChallengeButton'

export interface Props {
	challengeName: string
}

const ChallengeButton: React.FC<Props> = ({ challengeName }) => {
	const auth = useSelector((state: Data) => state.data.auth)
	const challengeList = useSelector((state: Data) => state.data.challengeList)
	const selectedChallenge = useSelector(
		(state: Data) => state.data.selectedChallenge
	)

	return (
		<Container
			className={
				selectedChallenge &&
				challengeName.split('/')[0].toUpperCase() ===
					selectedChallenge
						.split('/')[0]
						.split(' ')
						.join('_')
						.toUpperCase() &&
				challengeName.split('/')[1].toUpperCase() ===
					selectedChallenge
						.split('/')[1]
						.split(' ')
						.join('_')
						.toUpperCase()
					? 'active'
					: ''
			}
		>
			<Challenge>
				<div>
					<HashtagIcon />
					{challengeName ? (
						<span>{titleCase(challengeName.split('/')[1])}</span>
					) : (
						<></>
					)}
				</div>
				{auth.authenticated &&
				challengeList &&
				challengeList.filter(challenge => {
					return (
						challenge.challengeId.toUpperCase() ===
							challengeName.split('/')[1].toUpperCase() &&
						challenge.contestId.toUpperCase() ===
							challengeName.split('/')[0].toUpperCase()
					)
				}).length > 0 ? (
					<CheckIcon />
				) : (
					<></>
				)}
			</Challenge>
		</Container>
	)
}

export default ChallengeButton
