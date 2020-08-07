import React from 'react'

import {
    ContainerInfo,
    ContainerDescription,
    Title,
    Separator,
    Info
} from './styles'

import base64 from 'base-64'
import ReactMarkdown from 'react-markdown'
import { titleCase, Data } from '../Utils'
import { useSelector } from 'react-redux'

export interface Props {
    challengeName?: string;
}

const ChallengeInfo: React.FC = () => {
    const challengeName = useSelector((state: Data) => state.data.selectedChallenge.name)
    const challengeIndex = useSelector((state: Data) => state.data.challengeIndex)
    return (
        <>
            <ContainerInfo>
                <Title>
                    {titleCase(challengeName.split('/')[1] as string)}
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
