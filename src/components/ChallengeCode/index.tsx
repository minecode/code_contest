import React, { useState, useEffect } from 'react'
import base64 from 'base-64'
import Dropzone from 'react-dropzone'
import apiCodeContest from '../../services/apiCodeContest'
import apiDatabase from '../../services/apiDatabase'
import { config } from '../Utils'
import { useSelector } from 'react-redux'
import { Data, BodyRequest } from '../Interface'
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

const ChallengeCode: React.FC = () => {
	const dataAuth = useSelector((state: Data) => state.data.auth)
	const selectedChallengeName = useSelector(
		(state: Data) => state.data.selectedChallenge.name
	)

	const [show, setShow] = useState(false)
	const [fileName, setFileName] = useState('')
	const [inProgress, setInProgress] = useState(false)
	const [bodyRequest, setBodyRequest] = useState<BodyRequest | null>(null)
	const [currentChallengeName, setCurrentChallengeName] = useState<string>(
		'challenge'
	)

	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	if (
		selectedChallengeName &&
		selectedChallengeName !== currentChallengeName
	) {
		setShow(false)
		setFileName('')
		setInProgress(false)
		setBodyRequest(null)
		setCurrentChallengeName(selectedChallengeName)
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

							const bodyRequest: BodyRequest = {
								message: `${selectedChallengeName
									?.split(' ')
									.join('_')}/${dataAuth.user.id}`,
								committer: {
									name: 'minecodebot',
									email: 'minecode.geral@gmail.com'
								},
								content: `${result}`
							}

							try {
								const fileAlreadyExist = await apiDatabase.get(
									`/contents/${selectedChallengeName
										?.split(' ')
										.join('_')}/${dataAuth.user.id}`
								)
								bodyRequest.sha = `${fileAlreadyExist.data.sha}`
							} catch (error) {
								console.log(error)
							}
							setBodyRequest(bodyRequest)
						}
					},
					false
				)
				return file.name
			})
		)
	}

	const submitFile = async () => {
		setInProgress(true)
		await apiCodeContest.put(
			`/contents/${selectedChallengeName?.split(' ').join('_')}/${
				dataAuth.user.id
			}/resolution.py`,
			bodyRequest,
			config
		)
	}

	const submitCode = async () => {
		setInProgress(true)
		await apiCodeContest.put(
			`/contents/${selectedChallengeName?.split(' ').join('_')}/${
				dataAuth.user.id
			}/resolution.py`,
			bodyRequest,
			config
		)
	}

	const onChange = async (newValue: string) => {
		const bodyRequest: BodyRequest = {
			message: `${selectedChallengeName?.split(' ').join('_')}/${
				dataAuth.user.id
			}`,
			committer: {
				name: 'minecodebot',
				email: 'minecode.geral@gmail.com'
			},
			content: `${base64.encode(newValue)}`
		}

		try {
			const fileAlreadyExist = await apiDatabase.get(
				`/contents/${selectedChallengeName?.split(' ').join('_')}/${
					dataAuth.user.id
				}`
			)
			bodyRequest.sha = `${fileAlreadyExist.data.sha}`
		} catch (error) {
			console.log(error)
		}
		setBodyRequest(bodyRequest)
	}

	const uploadRepoCode = async () => {
		try {
			const getCodeSended = await apiDatabase.get(
				`/contents/${selectedChallengeName?.split(' ').join('_')}/${
					dataAuth.user.id
				}`
			)
			const bodyRequest: BodyRequest = {
				message: `${selectedChallengeName?.split(' ').join('_')}/${
					dataAuth.user.id
				}`,
				committer: {
					name: 'minecodebot',
					email: 'minecode.geral@gmail.com'
				},
				content: `${getCodeSended.data.content}`
			}
			setBodyRequest(bodyRequest)
		} catch {
			const bodyRequest: BodyRequest = {
				message: `${selectedChallengeName?.split(' ').join('_')}/${
					dataAuth.user.id
				}`,
				committer: {
					name: 'minecodebot',
					email: 'minecode.geral@gmail.com'
				},
				content: `${base64.encode('# Place your code here')}`
			}
			setBodyRequest(bodyRequest)
		}
	}

	useEffect(() => {
		uploadRepoCode()
		// eslint-disable-next-line
	}, [selectedChallengeName])

	return (
		<Container>
			{selectedChallengeName &&
			selectedChallengeName.split('/')[1].length > 0 ? (
				<ChallengeCodeFiles>
					{bodyRequest ? (
						<>{console.log('Body request', bodyRequest)}</>
					) : (
						<></>
					)}
					{bodyRequest ? (
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
								value={base64.decode(bodyRequest.content)}
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
									<span>{isDragActive ? '📂' : '📁'}</span>
									<p>
										{fileName ? (
											<>{fileName}</>
										) : isDragReject ? (
											<> Invalid file </>
										) : (
											<>
												Drag & ChallengeCode images, or
												click to select files
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
								<Modal.Title>Test in progress...</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<Container>
									<Row>
										<Col xs={12} className="text-center">
											<Spinner animation="border" />
										</Col>
										<Col xs={12} className="text-center">
											<p>
												We are testing your solution...
												Soon as possibel, your
												pontuation will be upadated!!
											</p>
										</Col>
									</Row>
								</Container>
							</Modal.Body>
						</Modal>
					) : fileName.length > 0 && bodyRequest ? (
						<SubmitButton
							onClick={() => {
								submitFile()
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
			)}
		</Container>
	)
}

export default ChallengeCode
