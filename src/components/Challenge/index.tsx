import React from 'react'
import { Data } from '../Interface'
import { useSelector } from 'react-redux'
import LoginMessage from '../LoginMessage'
import ChallengeInfo from '../ChallengeInfo'
import ChallengeCode from '../ChallengeCode'
import { Container, Grid } from './styles'

const Challenge: React.FC = () => {
    const authenticated = useSelector((state: Data) => state.data.auth.authenticated)
    const selectedChallengeName = useSelector((state: Data) => state.data.selectedChallenge.name)

    return (
        <Container>
            <Grid>
                {selectedChallengeName ? (
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
            </Grid>
        </Container>
    )
}

export default Challenge
