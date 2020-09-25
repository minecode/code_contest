import React, { useState, useEffect } from 'react'
import ReactMarkdownWithHtml from 'react-markdown'
import { Data } from '../Interface'
import { titleCase } from '../Utils'
import { useSelector } from 'react-redux'
import {
	ContainerInfo,
	ContainerDescription,
	Title,
	Info
} from './ChallengeInfo'
import AWS from 'aws-sdk'
import toc from 'remark-toc'
import CodeBlock from './CodeBlock'
import MarkdownRender from './MarkdownRender'

const ChallengeInfo: React.FC = () => {
	const selectedChallenge = useSelector(
		(state: Data) => state.data.selectedChallenge
	)
	const [challengeIndex, setChallengeIndex] = useState<string>()

	var s3 = new AWS.S3({
		apiVersion: '2006-03-01',
		region: process.env.NEXT_PUBLIC_AWS_REGION,
		accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY_ID
	})

	useEffect(() => {
		var params = {
			Bucket: 'code-contest',
			Key: `${selectedChallenge?.split(' ').join('_')}/index.md`
		}
		s3.getObject(params, function (err, data) {
			if (!err) {
				setChallengeIndex(data.Body?.toString('utf-8'))
			}
		})
		// eslint-disable-next-line
	}, [selectedChallenge])

	return (
		<ContainerInfo>
			<Title>
				{titleCase(selectedChallenge.split('/')[1] as string)}
			</Title>
			<ContainerDescription>
				<Info>
					{challengeIndex && challengeIndex.length > 1 ? (
						<>
							<div className="result-pane">
								<MarkdownRender source={challengeIndex} />
							</div>
						</>
					) : (
						''
					)}
				</Info>
			</ContainerDescription>{' '}
		</ContainerInfo>
	)
}

export default ChallengeInfo
