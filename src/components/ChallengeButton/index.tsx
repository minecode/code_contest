import React from 'react'
import { titleCase } from '../Utils'
import { Data } from '../Interface'
import { Container, HashtagIcon, CheckIcon, Challenge } from './styles'
import { useSelector } from 'react-redux'
export interface Props {
    challengeName: string;
}

const ChallengeButton: React.FC<Props> = ({ challengeName }) => {
    const authenticated = useSelector((state: Data) => state.data.auth.authenticated)
    const challengeList = useSelector((state: Data) => state.data.challengeList)
    const selectedChallengeName = useSelector((state: Data) => state.data.selectedChallenge.name)

    return (
        <Container
            className={
                selectedChallengeName && challengeName.split('/')[0].toUpperCase() === selectedChallengeName.split('/')[0].split(' ').join('_').toUpperCase() && challengeName.split('/')[1].toUpperCase() === selectedChallengeName.split('/')[1].split(' ').join('_').toUpperCase() ? 'active' : ''}
        >
            <Challenge>
                <div>
                    <HashtagIcon />
                    {challengeName ? (
                        <span>{titleCase(challengeName.split('/')[1])}</span>
                    ) : (
                        <></>
                    )}
                </div>
                {authenticated && challengeList && challengeList.filter((challenge) => {
                    return (
                        challenge.challengeId.toUpperCase() === challengeName.split('/')[1].toUpperCase() && challenge.contestId.toUpperCase() === challengeName.split('/')[0].toUpperCase()
                    )
                }).length > 0 ? (
                        <CheckIcon />
                    ) : (
                        <></>
                    )}
            </Challenge>
        </Container>
    )
}

export default ChallengeButton
