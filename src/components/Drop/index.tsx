import React, { useState, useEffect } from 'react'

import base64 from 'base-64'
import { Container, DropFiles, SubmitButton, DropFilesZone, Editor } from './styles'
import Dropzone from 'react-dropzone'
import apiCodeContest from '../../services/apiCodeContest'

import { Modal, Spinner, Col, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-dracula";

import { Data } from '../Utils'  
interface BodyRequest {
    [key: string]: any
}
const Drop: React.FC = () => {
    const [fileName, setFileName] = useState('')
    const [solution, setSolution] = useState<string>('')
    const [inProgress, setInProgress] = useState(false)
    const [sendedFile, setSendedFile] = useState(false)
    const [show, setShow] = useState(false)
    const [currentChallengeName, setCurrentChallengeName] = useState<string>('challenge')
    const [bodyRequest, setBodyRequest] = useState <BodyRequest | null >(null)
    const challengeName = useSelector((state: Data) => state.data.selectedChallenge.name)
    const dataAuth = useSelector((state: Data) => state.data.auth)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const config = {
        headers: {
            Authorization: `Basic ${(process.env.REACT_APP_APIKEY || 'null')}`,
            Accept: 'application/vnd.github.antiope-preview+json'
        }
    }

    if (challengeName && challengeName !== currentChallengeName) {
        setCurrentChallengeName(challengeName)
        setFileName('')
        setBodyRequest(null)
        setSendedFile(false)
        setShow(false)
        setSolution('')
        setInProgress(false)
    }

    const handleDrop = (acceptedFile: any) => {
        setSendedFile(false)
        setFileName(acceptedFile.map((file: any) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.addEventListener('load', async () => {
                if (reader) {
                    const result = (reader.result as string).split(',')[1]

                    const bodyRequest: BodyRequest = {
                        message: `${challengeName?.split(' ').join('_')}/${dataAuth.user.id}`,
                        committer: {
                            name: 'minecodebot',
                            email: 'minecode.geral@gmail.com'
                        },
                        content: `${result}`
                    }

                    try {
                        const fileAlreadyExist = await apiCodeContest.get(`/contents/${challengeName?.split(' ').join('_')}/${dataAuth.user.id}/resolution.py`, config)
                        bodyRequest.sha = `${fileAlreadyExist.data.sha}`
                    } catch (error) {
                        console.log(error)
                    }
                    setBodyRequest(bodyRequest)
                }
            }, false)
            return file.name
        }))
    }

    const submitFile = async () => {
        setSolution('')
        setInProgress(true)
        await apiCodeContest.put(`/contents/${challengeName?.split(' ').join('_')}/${dataAuth.user.id}/resolution.py`, bodyRequest, config)
    }

    const submitCode = async () => {
        setSolution('')
        setInProgress(true)
        await apiCodeContest.put(`/contents/${challengeName?.split(' ').join('_')}/${dataAuth.user.id}/resolution.py`, bodyRequest, config)           
    }

    const onChange = async (newValue: string) => {
        const bodyRequest: BodyRequest = {
            message: `${challengeName?.split(' ').join('_')}/${dataAuth.user.id}`,
            committer: {
                name: 'minecodebot',
                email: 'minecode.geral@gmail.com'
            },
            content: `${base64.encode(newValue)}`
        }

        try {
            const fileAlreadyExist = await apiCodeContest.get(`/contents/${challengeName?.split(' ').join('_')}/${dataAuth.user.id}/resolution.py`, config)
            bodyRequest.sha = `${fileAlreadyExist.data.sha}`
        } catch (error) {
            console.log(error)
        }
        setBodyRequest(bodyRequest)

      }

    const uploadRepoCode = async () => {

        try {
            const getCodeSended = await apiCodeContest.get(`/contents/${challengeName?.split(' ').join('_')}/${dataAuth.user.id}/resolution.py`, config)
            const bodyRequest: BodyRequest = {
                message: `${challengeName?.split(' ').join('_')}/${dataAuth.user.id}`,
                committer: {
                    name: 'minecodebot',
                    email: 'minecode.geral@gmail.com'
                },
                content: `${getCodeSended.data.content}`
            }
            setBodyRequest(bodyRequest)
        } catch {
            const bodyRequest: BodyRequest = {
                message: `${challengeName?.split(' ').join('_')}/${dataAuth.user.id}`,
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
    }, [challengeName])

    return (
        <Container>
            {challengeName && challengeName.split('/')[1].length > 0
                ? <Dropzone
                    onDrop={handleDrop}
                >
                    {({
                        getRootProps,
                        getInputProps,
                        isDragActive,
                        isDragReject
                    }) => {
                        return (
                            <DropFiles>
                                {challengeName && bodyRequest ? 
                                    <Editor debounceChangePeriod={1000}
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
                                            tabSize: 2,
                                        }}
                                  /> : <></>}
                                    {bodyRequest ? <SubmitButton onClick={() => { submitCode(); handleShow() }}>Submit code</SubmitButton> : <></> }
                                    <h2>or</h2>
                                <DropFilesZone {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <span>{isDragActive ? '📂' : '📁'}</span>
                                    <p>
                                        {fileName ? <>{fileName}</> : isDragReject ? <> Invalid file </> : <>Drag & drop images, or click to select files</>}
                                    </p>
                                </DropFilesZone>

                                {inProgress ? <Modal
                                    show={show}
                                    onHide={handleClose}
                                    backdrop="static"
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
                                                    <p>We are testing your solution... Soon as possibel, your pontuation will be upadated!!</p>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Modal.Body>
                                </Modal>
                                    : bodyRequest && !sendedFile && fileName.length > 0 ? <SubmitButton onClick={() => { submitFile(); handleShow() }}>Submit file</SubmitButton> : sendedFile && solution ? <p>{solution}</p> : <></>}
                            </DropFiles>
                        )
                    }}
                </Dropzone> : <></>
            }
        </Container>
    )
}

export default Drop
