import React from 'react'
import base64 from 'base-64'
import { useSelector } from 'react-redux'
import { User, UserApi, Data } from '../Interface'
import { Container, Role, User as UserElem, Avatar } from './UserList'
import AWS from 'aws-sdk'

export interface Props {
	user: {
		firstName: string
		lastName: string
		imageUrl: string
	}
	score: number
}

const UserRow: React.FC<Props> = ({ user, score }) => {
	

	return (
		<UserElem>
			<Avatar src={base64.decode(user.imageUrl)} />
			<strong>
				{user.firstName} {user.lastName}
			</strong>
			<span>{score}</span>
		</UserElem>
	)
}

const UserList: React.FC = () => {

	var dynamodb = new AWS.DynamoDB({
		apiVersion: '2012-08-10',
		region: process.env.NEXT_PUBLIC_AWS_REGION,
		accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY_ID
	})

	var params = {
		KeyConditionExpression: "contest = :contest and challenge = :challenge",
		TableName: "code-contest-pontuations",
		ExpressionAttributeValues: {
			":contest": {'S': "hackacity"},
			":challenge": {'S': "challenge_2"},
		}
	};

	dynamodb.query(params, function(err, data) {
		if (err) console.log(err, err.stack); // an error occurred
		else     console.log(data);           // successful response
	});


	const globalScore: User[] = useSelector(
		(state: Data) => state.data.globalScore
	)
	const listOfUsers: UserApi[] = useSelector(
		(state: Data) => state.data.listOfUsers
	)
	const challengeScore: User[] = useSelector(
		(state: Data) => state.data.challengeScore
	)
	const selectedChallenge = useSelector(
		(state: Data) => state.data.selectedChallenge
	)

	return (
		<Container>
			{selectedChallenge ? (
				<Role>
					{selectedChallenge
						.split('/')
						.join(' ')
						.split('_')
						.join(' ')}
				</Role>
			) : (
				<Role>Global</Role>
			)}
			{challengeScore && challengeScore.length > 0 && listOfUsers ? (
				challengeScore.map(function (element, i) {
					const getUser: UserApi[] = listOfUsers.filter(element2 => {
						return element2.userId === element.userId
					})
					const user = getUser.pop()
					if (user) {
						return (
							<UserRow
								key={i}
								user={user}
								score={element.score}
							/>
						)
					} else {
						return <></>
					}
				})
			) : globalScore && listOfUsers && !selectedChallenge ? (
				globalScore.map(function (element, i) {
					const getUser: UserApi[] = listOfUsers.filter(element2 => {
						return element2.userId === element.userId
					})
					const user = getUser.pop()
					if (user) {
						return (
							<UserRow
								key={i}
								user={user}
								score={element.score}
							/>
						)
					} else {
						return <></>
					}
				})
			) : (
				<></>
			)}
		</Container>
	)
}

export default UserList
