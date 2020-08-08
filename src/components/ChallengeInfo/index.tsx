import React from 'react'
import base64 from 'base-64'
import ReactMarkdown from 'react-markdown'
import { Data } from '../Interface'
import { titleCase } from '../Utils'
import { useSelector } from 'react-redux'
import { ContainerInfo, ContainerDescription, Title, Separator, Info } from './styles'

const ChallengeInfo: React.FC = () => {
    const challengeIndex = useSelector((state: Data) => state.data.challengeIndex)
    const selectedChallengeName = useSelector((state: Data) => state.data.selectedChallenge.name)

    return (
        <>
            <ContainerInfo>
                <Title>
                    {titleCase(selectedChallengeName.split('/')[1] as string)}
                </Title>
                <Separator />
            </ContainerInfo>
            <ContainerDescription>
                <Info>
                    {challengeIndex && base64.decode(challengeIndex.content).length > 1
                        ? <ReactMarkdown source={base64.decode(challengeIndex.content)} />
                        : ''}
                </Info>
            </ContainerDescription>
        </>
    )
}

export default ChallengeInfo
