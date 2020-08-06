import React, { useState } from 'react'

import { Container, DropFiles, SubmitButton, DropFilesZone } from './styles'
import Dropzone from 'react-dropzone'
import apiCodeContest from '../../services/apiCodeContest'

import { Modal, Spinner, Col, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'

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
    const challengeName = useSelector((state: any) => state.data.selectedChallenge.name)
    const dataAuth = useSelector((state: any) => state.data.auth)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const config = {
        headers: {
            Authorization: `token ${process.env.REACT_APP_APIKEY}`,
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
                        const fileAlreadyExist = await apiCodeContest.get(`/contents/contests/${challengeName?.split(' ').join('_')}/${dataAuth.user.id}/resolution.py`, config)
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

    const submitFile = async (bodyRequest: BodyRequest) => {
        setSolution('')
        setInProgress(true)
        await apiCodeContest.put(`/contents/contests/${challengeName?.split(' ').join('_')}/${dataAuth.user.id}/resolution.py`, bodyRequest, config)
    }

    return (
        <Container>
            {challengeName
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
                                    : bodyRequest && !sendedFile ? <SubmitButton onClick={() => { submitFile(bodyRequest); handleShow() }}>Submit</SubmitButton> : sendedFile && solution ? <p>{solution}</p> : <></>}
                            </DropFiles>
                        )
                    }}
                </Dropzone> : <></>
            }
        </Container>
    )
}

export default Drop
