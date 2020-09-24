import React from 'react'
import { Data } from '../Interface'
import { titleCase } from '../Utils'
import { useSelector } from 'react-redux'
import { Container, ContestIcon, Contest } from './ContestButton'

export interface Props {
	contestName: string
	size: number
}

const ContestButton: React.FC<Props> = ({ contestName, size }) => {
	const auth = useSelector((state: Data) => state.data.auth)
	const userScore = useSelector((state: Data) => state.data.userScore)
	const challengeList = useSelector((state: Data) => state.data.challengeList)
	const selectedChallenge = useSelector(
		(state: Data) => state.data.selectedChallenge
	)
	return (
		<Container
			className={
				selectedChallenge &&
				contestName.split('/')[0].toUpperCase() ===
					selectedChallenge
						.split('/')[0]
						.split(' ')
						.join('_')
						.toUpperCase()
					? 'active'
					: ''
			}
		>
			<Contest>
				<div>
					<ContestIcon />
					{contestName ? (
						<span>{titleCase(contestName.split('/')[0])}</span>
					) : (
						<></>
					)}
				</div>
				{challengeList && auth.authenticated ? (
					userScore ? (
						<span>
							{
								challengeList.filter(element => {
									return element.contestId === contestName
								}).length
							}
							/{size}
						</span>
					) : (
						<span>0/{size}</span>
					)
				) : (
					<></>
				)}
			</Contest>
		</Container>
	)
}

export default ContestButton
