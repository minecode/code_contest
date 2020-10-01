import React, { useState, useEffect } from 'react'
import base64 from 'base-64'
import Dropzone from 'react-dropzone'
import { useSelector } from 'react-redux'
import LoginMessage from '../LoginMessage'
import { Data, BodyResponse } from '../Interface'
import { Modal, Spinner, Col, Row } from 'react-bootstrap'
import {
	Container,
	ChallengeCodeFiles,
	SubmitButton,
	ChallengeCodeFilesZone,
	Editor
} from './ChallengeCode'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/theme-dracula'
import AWS from 'aws-sdk'
import usePersistedState from '../../hooks/usePersistedState'

const ChallengeCode: React.FC = () => {
	const auth = useSelector((state: Data) => state.data.auth)
	const selectedChallenge = useSelector(
		(state: Data) => state.data.selectedChallenge
	)
	const [authenticated, setAuthenticated] = usePersistedState('loggedIn', false)
	const [show, setShow] = useState(false)
	const [fileName, setFileName] = useState('')
	const [inProgress, setInProgress] = useState(false)
	const [bodyResponse, setBodyResponse] = useState<BodyResponse | null>(null)
	const [currentChallengeName, setCurrentChallengeName] = useState<string>(
		'challenge'
	)

	var s3 = new AWS.S3({
		apiVersion: '2006-03-01',
		region: process.env.NEXT_PUBLIC_AWS_REGION,
		accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY_ID
	})

	var lambda = new AWS.Lambda({
		apiVersion: '2015-03-31',
		region: process.env.NEXT_PUBLIC_AWS_REGION,
		accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY_ID
	})

	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	if (selectedChallenge && selectedChallenge !== currentChallengeName) {
		setShow(false)
		setFileName('')
		setInProgress(false)
		setBodyResponse(null)
		setCurrentChallengeName(selectedChallenge)
	}

	const handleChallengeCode = (acceptedFile: any) => {
		setFileName(
			acceptedFile.map((file: any) => {
				const reader = new FileReader()
				reader.readAsDataURL(file)
				reader.addEventListener(
					'load',
					async () => {
						if (reader) {
							const result = (reader.result as string).split(
								','
							)[1]
							setBodyResponse({ content: base64.decode(result) })
						}
					},
					false
				)
				return file.name
			})
		)
	}

	const submitCode = async () => {
		setInProgress(true)
		var params = {
			Body: bodyResponse?.content,
			Bucket: 'code-contest',
			Key: `${selectedChallenge?.split(' ').join('_')}/${
				auth.user.id
			}/response.py`
		}
		s3.putObject(params, function (err, data) {
			if (err) {
				console.log(err, err.stack)
			} // an error occurred
			else {
				var params = {
					FunctionName: 'codeContestTest',
					Payload:
						'{ "Bucket": "code-contest", "Key": "' +
						selectedChallenge?.split(' ').join('_') +
						'/' +
						auth.user.id +
						'/response.py" }'
				}
				lambda.invoke(params, function (err2, data2) {
					if (err2) console.log(err2, err2.stack)
					// an error occurred
					else console.log(data2) // successful response
				})
			} // successful response
		})
	}

	const onChange = async (newValue: string) => {
		setBodyResponse({ content: newValue })
	}

	const uploadRepoCode = async () => {
		var params = {
			Bucket: 'code-contest',
			Prefix: `${selectedChallenge?.split(' ').join('_')}/${
				auth.user.id
			}/`
		}
		s3.listObjectsV2(params, function (err, data) {
			if (err) {
				setBodyResponse({ content: '# Place your code here' })
			} else {
				let hasResponse = false
				data.Contents?.map((item, i) => {
					if (item.Key?.slice(0, -1).split('/').length === 4) {
						var params = {
							Bucket: 'code-contest',
							Key: item.Key
						}
						s3.getObject(params, function (err2, data2) {
							if (err2) console.log(err2, err2.stack)
							else {
								hasResponse = true
								setBodyResponse({
									content: data2.Body?.toString('utf-8')
								})
							}
						})
					}
				})
				if (!hasResponse) {
					setBodyResponse({ content: '# Place your code here' })
				}
			}
		})
	}

	useEffect(() => {
		if (auth.user) uploadRepoCode()
		// eslint-disable-next-line
	}, [selectedChallenge])

	useEffect(() => {
		console.log(authenticated)
	}, [authenticated])

	return (
		<Container>
			{authenticated ? (
				selectedChallenge &&
				selectedChallenge.split('/')[1].length > 0 ? (
					<ChallengeCodeFiles>
						{bodyResponse ? (
							<>
								<Editor
									debounceChangePeriod={1000}
									mode="python"
									theme="dracula"
									onChange={onChange}
									name="codeeditor1"
									fontSize={18}
									showPrintMargin={true}
									showGutter={true}
									highlightActiveLine={true}
									editorProps={{ $blockScrolling: true }}
									value={bodyResponse.content}
									setOptions={{
										enableBasicAutocompletion: false,
										enableLiveAutocompletion: false,
										enableSnippets: false,
										showLineNumbers: true,
										tabSize: 2
									}}
								/>
								<SubmitButton
									onClick={() => {
										submitCode()
										handleShow()
									}}
								>
									Submit code
								</SubmitButton>
								<h2>or</h2>
							</>
						) : (
							<></>
						)}
						<Dropzone onDrop={handleChallengeCode}>
							{({
								getRootProps,
								getInputProps,
								isDragActive,
								isDragReject
							}) => {
								return (
									<ChallengeCodeFilesZone {...getRootProps()}>
										<input {...getInputProps()} />
										<span>
											{isDragActive ? '📂' : '📁'}
										</span>
										<p>
											{fileName ? (
												<>{fileName}</>
											) : isDragReject ? (
												<> Invalid file </>
											) : (
												<>
													Drag & Drop, or click to
													select files
												</>
											)}
										</p>
									</ChallengeCodeFilesZone>
								)
							}}
						</Dropzone>
						{inProgress ? (
							<Modal
								show={show}
								onHide={handleClose}
								backChallengeCode="static"
							>
								<Modal.Header closeButton>
									<Modal.Title>
										Test in progress...
									</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									<Container>
										<Row>
											<Col
												xs={12}
												className="text-center"
											>
												<Spinner animation="border" />
											</Col>
											<Col
												xs={12}
												className="text-center"
											>
												<p>
													We are testing your
													solution... Soon as
													possibel, your pontuation
													will be upadated!!
												</p>
											</Col>
										</Row>
									</Container>
								</Modal.Body>
							</Modal>
						) : fileName.length > 0 && bodyResponse ? (
							<SubmitButton
								onClick={() => {
									submitCode()
									handleShow()
								}}
							>
								Submit file
							</SubmitButton>
						) : (
							<></>
						)}
					</ChallengeCodeFiles>
				) : (
					<></>
				)
			) : (
				<LoginMessage />
			)}
		</Container>
	)
}

export default ChallengeCode
