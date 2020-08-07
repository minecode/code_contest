import React from 'react'
import { titleCase } from '../Utils'

import { Container, ContestIcon } from './styles'
import { useSelector } from 'react-redux'
import { Data, Challenge } from '../Utils'

export interface Props {
    contestName: string
    size: number
}

const ContestButton: React.FC<Props> = ({ contestName, size }) => {
    const dataAuth = useSelector((state: Data) => state.data.auth)
    const selectedChallengeName = useSelector((state: Data) => state.data.selectedChallenge.name)
    const userScore = useSelector((state: Data) => state.data.userScore)
    const challengeList: Challenge[] = useSelector((state: Data) => state.data.challengeList)

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
