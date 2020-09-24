import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Authentication from '../components/Authentication'
import Dashboard from '../components/Dashboard'
import Navbar from '../components/Navbar'
import UserList from '../components/UserList'
import ChallengeInfo from '../components/ChallengeInfo'
import ChallengeCode from '../components/ChallengeCode'
import ContestList from '../components/ContestList'
import { Grid, Container } from '../styles/pages/Home'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AWS from 'aws-sdk'
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
	const dispatch = useDispatch()
	const data = useSelector((state: Data) => state.data)
	const selectedChallenge = useSelector(
		(state: Data) => state.data.selectedChallenge
	)

	const [load, setLoad] = useState(false)
	const [contents, setContents] = useState<Object[]>()

	var s3 = new AWS.S3({
		apiVersion: '2006-03-01',
		region: 'us-east-1',
		accessKeyId: 'AKIA3M6MCOV556RF6YQG',
		secretAccessKey: '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'
	})

	useEffect(() => {
		var params = {
			Bucket: 'code-contest'
		}

		s3.listObjectsV2(params, function (err, objects) {
			if (err) console.log(err, err.stack)
			// an error occurred
			else {
				setLoad(true)
				setContents(objects.Contents)
			}
		})
	}, [])

	useEffect(() => {
		const newData = { data: data }
		const authLocalStorage = localStorage.getItem('auth')
		const selectedChallengeLocalStorage = localStorage.getItem('challenge')
		newData.data.auth = JSON.parse(authLocalStorage)
		newData.data.selectedChallenge = JSON.parse(
			selectedChallengeLocalStorage
		)
		dispatch({ type: 'CHALLENGE', data: newData })
	}, [])

	return (
		<Grid>
			<Head>
				<title>Code Contest</title>
			</Head>
			{load ? (
				<>
					<Navbar />
					<ContestList contents={contents} />
					<Container>
						{selectedChallenge &&
						selectedChallenge.split('/').length > 1 &&
						selectedChallenge.split('/')[1].length > 1 ? (
							<>
								<ChallengeInfo />
								<ChallengeCode />
							</>
						) : (
							<>Place home page here!</>
						)}
					</Container>
					<UserList />
				</>
			) : (
				<></>
			)}
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
