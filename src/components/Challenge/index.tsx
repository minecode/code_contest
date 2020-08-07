import React from 'react'

import { Container, Grid, LoginInfo, Message } from './styles'
import { Col, Row } from 'react-bootstrap'

import ChallengeInfo from '../ChallengeInfo'
// import ContestList from '../ContestList'

import Drop from '../Drop'
import { useSelector, useDispatch } from 'react-redux'

import { GoogleLogin } from 'react-google-login'
import { BtnGoogle } from '../Authentication/styles'
import { Data } from '../Utils'

const Challenge: React.FC = () => {
    const data = useSelector((state: Data) => state.data)
    const authentication = useSelector((state: Data) => state.data.auth.authenticated)
    const challengeName = useSelector((state: Data) => state.data.selectedChallenge.name)

    const dispatch = useDispatch()

    const login = (response: any) => {
        const newData = { data: data }

        newData.data.auth = {
            authenticated: true,
            user: {
                id: response.googleId,
                name: response.profileObj.givenName,
                surname: response.profileObj.familyName,
                image: response.profileObj.imageUrl
            },
            token: response.tokenId
        }

        dispatch({ type: 'LOGIN', data: newData })
    }

    const badResponseGoogle = (response: string) => {
        console.log(response)
        dispatch({ type: 'BAD_RESPONSE', data: null })
    }

    return (
        <Container>
            <Grid>
                {/* <ContestList /> */}
                {challengeName ? (
                    <>
                        <ChallengeInfo />
                        {authentication ? (
                            <Drop />
                        ) : (
                            <Message>
                                <Row>
                                    <Col xs={12} className="text-center">
                                        <LoginInfo>You need to <GoogleLogin
                                            clientId='156221636932-bvl7ocr3bhrkikgcqc99k4g1a1s0sla1.apps.googleusercontent.com'
                                            buttonText='Login'
                                            onSuccess={login}
                                            onFailure={badResponseGoogle}
                                            cookiePolicy={'single_host_origin'}
                                            isSignedIn={true}
                                            render={renderProps => (
                                                <BtnGoogle onClick={renderProps.onClick} disabled={renderProps.disabled}>Sign In w/ Google</BtnGoogle>
                                            )}
                                        /> to send your solution!</LoginInfo>
                                    </Col>
                                </Row>
                            </Message>
                        )}
                    </>
                ) : (
                    <></>
                )}
            </Grid>
        </Container>
    )
}

export default Challenge
