import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Authentication from '../components/Authentication'
import Dashboard from '../components/Dashboard'
import Navbar from '../components/Navbar'
import UserList from '../components/UserList'
import LoginMessage from '../components/LoginMessage'
import ChallengeInfo from '../components/ChallengeInfo'
import ChallengeCode from '../components/ChallengeCode'
import ContestList from '../components/ContestList'
import { Grid, Container } from '../styles/pages/Home'
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";
import AWS from 'aws-sdk';
import { useFetch } from '../hooks/useFetch'
import { useSelector, useDispatch } from 'react-redux'
import {
	Data,
	Challenge as ChallengeInterface,
	User,
	UserApi,
	ChallengeContent,
	Contest
} from '../components/Interface'

const Home: React.FC = () => {
	// const dispatch = useDispatch()
	// const data = useSelector((state: Data) => state.data)
	// const userId = useSelector((state: Data) => state.data.auth.user.id)
	const authenticated = useSelector(
		(state: Data) => state.data.auth.authenticated
	)
	const selectedChallengeName = useSelector(
		(state: Data) => state.data.selectedChallenge.name
	)

	// const { data: globalScore } = useFetch<User[]>(
	// 	'https://code-contest-backend.herokuapp.com/contests/global'
	// )
	// const { data: listOfUsers } = useFetch<UserApi[]>(
	// 	'https://code-contest-backend.herokuapp.com/contests/user'
	// )
	// const { data: challengeList } = useFetch<ChallengeInterface[]>(
	// 	`https://code-contest-backend.herokuapp.com/contests/list/${userId}`
	// )
	// const { data: challengeIndex } = useFetch<ChallengeContent>(
	// 	`/contents/${selectedChallengeName?.split(' ').join('_')}/index.md`
	// )
	// const { data: challengeScore } = useFetch<User[]>(
	// 	`https://code-contest-backend.herokuapp.com/contests/global/${selectedChallengeName}`
	// )
	// const { data: userScore } = useFetch<User[]>(
	// 	`https://code-contest-backend.herokuapp.com/contests/${userId}/${selectedChallengeName}`
	// )
	// const { data: dataTree } = useFetch<Contest>(
	// 	'/git/trees/5c51dbca32b9394fe304b519826c1364806cdb9e?recursive="true"'
	// )

	const [load, setLoad] = useState(false)
	const [contents, setContents] = useState<Object[]>()

	var s3 = new AWS.S3({apiVersion: '2006-03-01', region: 'us-east-1', accessKeyId: 'AKIA3M6MCOV556RF6YQG', secretAccessKey: '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'});

	useEffect(() => {
			var params = {
					Bucket: 'code-contest',
			};
			
			s3.listObjectsV2(params, function(err, objects) {
					if (err) console.log(err, err.stack); // an error occurred
					else    {
							setLoad(true)
							setContents(objects.Contents)
					}
			});
	}, [])

	// useEffect(() => {
	// 	const newData = { data: data }
	// 	if (
	// 		globalScore &&
	// 		listOfUsers &&
	// 		challengeScore &&
	// 		userScore &&
	// 		challengeList &&
	// 		dataTree
	// 	) {
	// 		newData.data.globalScore = globalScore
	// 		newData.data.listOfUsers = listOfUsers
	// 		newData.data.challengeScore = challengeScore
	// 		newData.data.userScore = userScore
	// 		newData.data.challengeList = challengeList
	// 		newData.data.tree = dataTree
	// 		setLoad(true)
	// 	}
	// 	if (challengeIndex) {
	// 		newData.data.challengeIndex = challengeIndex
	// 	}
	// 	dispatch({ type: 'CHALLENGE', data: newData })
	// }, [
	// 	globalScore,
	// 	listOfUsers,
	// 	challengeScore,
	// 	userScore,
	// 	challengeIndex,
	// 	challengeList,
	// 	dataTree,
	// 	dispatch,
	// 	data
	// ])

	return (
		<Grid>
			<Head>
				<title>Code Contest</title>
			</Head>
			{load ?
				<>
					<Navbar />
					<ContestList contents={contents} />
					<Container>
							{selectedChallengeName && selectedChallengeName.split('/').length > 1 && selectedChallengeName.split('/')[1].length > 1 ? (
									<>
											<ChallengeInfo />
											{authenticated ? 
													<ChallengeCode /> :
													<LoginMessage />
											}
									</>
							) : (
									<>Place home page here!</>
							)}
					</Container>
					<UserList />
				</>
			: <></> }
		</Grid>

		// <Grid>
			
		// 	{load ? (
		// 		<>
		// 			<Navbar />
		// 			<ContestList />
		// 			<Container>
		// 				{selectedChallengeName &&
		// 				selectedChallengeName.split('/').length > 1 &&
		// 				selectedChallengeName.split('/')[1].length > 1 ? (
		// 					<>
		// 						<ChallengeInfo />
		// 						{authenticated ? (
		// 							<ChallengeCode />
		// 						) : (
		// 							<LoginMessage />
		// 						)}
		// 					</>
		// 				) : (
		// 					<>Place home page here!</>
		// 				)}
		// 			</Container>
		// 			<UserList />
		// 		</>
		// 	) : (
		// 		<></>
		// 	)}
		// </Grid>
	)
}

export default Home
