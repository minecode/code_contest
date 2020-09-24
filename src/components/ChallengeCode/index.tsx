import React, { useState, useEffect } from 'react'
import base64 from 'base-64'
import Dropzone from 'react-dropzone'
import { useSelector } from 'react-redux'
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

import AWS from 'aws-sdk';

const ChallengeCode: React.FC = () => {
	const dataAuth = useSelector((state: Data) => state.data.auth)
	const selectedChallengeName = useSelector(
		(state: Data) => state.data.selectedChallenge.name
	)

	const [show, setShow] = useState(false)
	const [fileName, setFileName] = useState('')
	const [inProgress, setInProgress] = useState(false)
	const [bodyResponse, setBodyResponse] = useState <BodyResponse | null >(null)
	const [currentChallengeName, setCurrentChallengeName] = useState<string>('challenge')

	var s3 = new AWS.S3({apiVersion: '2006-03-01', region: 'us-east-1', accessKeyId: 'AKIA3M6MCOV556RF6YQG', secretAccessKey: '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'});

	var lambda = new AWS.Lambda({apiVersion: '2015-03-31', region: 'us-east-1', accessKeyId: 'AKIA3M6MCOV556RF6YQG', secretAccessKey: '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'});

	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	if (selectedChallengeName && selectedChallengeName !== currentChallengeName) {
			setShow(false)
			setFileName('')
			setInProgress(false)
			setBodyResponse(null)
			setCurrentChallengeName(selectedChallengeName)
	}

	const handleChallengeCode = (acceptedFile: any) => {

			setFileName(acceptedFile.map((file: any) => {
					const reader = new FileReader()
					reader.readAsDataURL(file)
					reader.addEventListener('load', async () => {
							if (reader) {
									const result = (reader.result as string).split(',')[1]
									setBodyResponse({content: base64.decode(result)})
							}
					}, false)
					return file.name
			}))
	}

	const submitCode = async () => {
			setInProgress(true)
			var params = {
					Body: bodyResponse?.content, 
					Bucket: "code-contest", 
					Key: `${selectedChallengeName?.split(' ').join('_')}/${dataAuth.user.id}/response.py`, 
			};
			s3.putObject(params, function(err, data) {
					if (err) {
							console.log(err, err.stack)
					} // an error occurred
					else {
							var params = {
									FunctionName: "codeContestTest", 
									Payload: '{ "Bucket": "code-contest", "Key": "'+selectedChallengeName?.split(" ").join("_")+'/'+dataAuth.user.id+'/response.py" }', 
							};
							lambda.invoke(params, function(err2, data2) {
									if (err2) console.log(err2, err2.stack); // an error occurred
									else     console.log(data2);           // successful response
							});
					}; // successful response
			});
	}

	const onChange = async (newValue: string) => {
			setBodyResponse({content: newValue})
	}

	const uploadRepoCode = async () => {
			var params = {
					Bucket: "code-contest", 
					Prefix: `${selectedChallengeName?.split(' ').join('_')}/${dataAuth.user.id}/`, 
			};
			s3.listObjectsV2(params, function(err, data) {
					if (err) {
							setBodyResponse({content: "# Place your code here"})
					}
					else {
							let hasResponse = false
							data.Contents?.map((item, i) => {
									if(item.Key?.slice(0,-1).split("/").length === 4) {
											var params = {
													Bucket: "code-contest", 
													Key: item.Key, 
											};
											s3.getObject(params, function(err2, data2) {
													if(err2) console.log(err2, err2.stack)
													else {
															hasResponse = true
															setBodyResponse({content: data2.Body?.toString('utf-8')})
													}
											})
									}
							}) 
							if(!hasResponse) {
									setBodyResponse({content: "# Place your code here"})
							}           
					}
			});
	}

	useEffect(() => {
		uploadRepoCode()
		// eslint-disable-next-line
	}, [selectedChallengeName])

	return (
			<Container>
					{selectedChallengeName && selectedChallengeName.split('/')[1].length > 0 ? 
							<ChallengeCodeFiles>
									{bodyResponse ?
											<>
													<Editor debounceChangePeriod={1000}
															mode='python'
															theme='dracula'
															onChange={onChange}
															name='codeeditor1'
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
													<SubmitButton onClick={() => { submitCode(); handleShow() }}>Submit code</SubmitButton>
													<h2>or</h2>
											</> : <></>
									}
									<Dropzone
											onDrop={handleChallengeCode}
									>
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
																			{fileName ? <>{fileName}</> : isDragReject ? <> Invalid file </> : <>Drag & ChallengeCode images, or click to select files</>}
																	</p>
															</ChallengeCodeFilesZone>
													)
											}}
									</Dropzone>
									{inProgress ? <Modal
											show={show}
											onHide={handleClose}
											backChallengeCode='static'
									>
											<Modal.Header closeButton>
													<Modal.Title>Test in progress...</Modal.Title>
											</Modal.Header>
											<Modal.Body>
													<Container>
															<Row>
																	<Col xs={12} className='text-center'>
																			<Spinner animation='border' />
																	</Col>
																	<Col xs={12} className='text-center'>
																			<p>We are testing your solution... Soon as possibel, your pontuation will be upadated!!</p>
																	</Col>
															</Row>
													</Container>
											</Modal.Body>
									</Modal> : fileName.length > 0 && bodyResponse ? <SubmitButton onClick={() => { submitCode(); handleShow() }}>Submit file</SubmitButton> : <></>}
							</ChallengeCodeFiles> : <></>
					}
			</Container>
	)
}

export default ChallengeCode
