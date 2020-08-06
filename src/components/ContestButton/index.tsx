import React from 'react'
import { titleCase } from '../Utils'

import { Container, ContestIcon } from './styles'
import { useSelector } from 'react-redux'

export interface Props {
    contestName: string
    size: number
}

export interface Challenge {
    id: string,
    userId: string,
    contestId: string,
    challengeId: string,
    score: number
}
const ContestButton: React.FC<Props> = ({ contestName, size }) => {
    const dataAuth = useSelector((state: any) => state.data.auth)
    const selectedChallengeName = useSelector((state: any) => state.data.selectedChallenge.name)
    const userScore = useSelector((state: any) => state.data.userScore)
    const challengeList: Challenge[] = useSelector((state: any) => state.data.challengeList)

    return (
        <Container className={selectedChallengeName && contestName.split('/')[0] === selectedChallengeName.split('/')[0].split(' ').join('_') ? 'active' : ''}>
            <div style={{ width: '100%' }}>
                <div>
                    <ContestIcon />
                    {contestName ? <span>{titleCase(contestName.split('/')[0])}</span> : <></>}
                </div>
                {challengeList && dataAuth.authenticated ? userScore ? <span>{challengeList.filter((element) => {
                    return element.contestId === contestName
                }).length}/{size}</span> : <span>0/{size}</span> : <></> }
            </div>
        </Container>
    )
}

export default ContestButton
