import React from 'react'
import { titleCase } from '../Utils'

import { Container, HashtagIcon, CheckIcon } from './styles'
import { useSelector } from 'react-redux'

export interface Props {
    challengeName: string;
}
export interface Challenge {
    id: string;
    userId: string;
    contestId: string;
    challengeId: string;
    score: number;
}

const ChallengeButton: React.FC<Props> = ({ challengeName }) => {
    const selectedChallengeName = useSelector(
        (state: any) => state.data.selectedChallenge.name
    )
    const challengeList: Challenge[] = useSelector(
        (state: any) => state.data.challengeList
    )

    return (
        <Container
            className={
                selectedChallengeName && challengeName.split('/')[0] === selectedChallengeName.split('/')[0].split(' ').join('_') && challengeName.split('/')[1] === selectedChallengeName.split('/')[1].split(' ').join('_') ? 'active' : ''}
        >
            <div style={{ width: '100%' }}>
                <div>
                    <HashtagIcon />
                    {challengeName ? (
                        <span>{titleCase(challengeName.split('/')[1])}</span>
                    ) : (
                        <></>
                    )}
                </div>
                {challengeList && challengeList.filter((element) => {
                    return (
                        element.challengeId.toUpperCase() === challengeName.split('/')[1].toUpperCase() && element.contestId.toUpperCase() === challengeName.split('/')[0].toUpperCase()
                    )
                }).length > 0 ? (
                        <CheckIcon />
                    ) : (
                        <></>
                    )}
            </div>
        </Container>
    )
}

export default ChallengeButton
