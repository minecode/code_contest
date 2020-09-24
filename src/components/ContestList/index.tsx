import React, { useCallback, useState } from 'react'
import ContestButton from '../ContestButton'
import ChallengeButton from '../ChallengeButton'
import { Data } from '../Interface'
import { useDispatch, useSelector } from 'react-redux'
import { ContainerList, Category } from './styles'
import { Object } from 'aws-sdk/clients/s3'

interface Props {
    contents: Object[] | undefined
}

const ContestList: React.FC<Props> = ({contents}) => {
    const dispatch = useDispatch()
    const data = useSelector((state: Data) => state.data)

    const [contestsActive, setContestsActive] = useState<string | undefined>('')

    const handleSelectChange = useCallback(
        (contest: string | undefined) => {
            const newData = { data: data }
            newData.data.selectedChallenge = { name: `${contest}` }
            
            dispatch({ type: 'CHALLENGE', data: newData })
        },
        [dispatch, data]
    )

    const handleVisibleContest = (contest: string | undefined) => {
        if (contestsActive === contest) {
            setContestsActive('')
            const newData = { data: data }
            newData.data.selectedChallenge = { name: '' }
            dispatch({ type: 'CHALLENGE', data: newData })
        } else {
            setContestsActive(contest)
            const newData = { data: data }
            newData.data.selectedChallenge = { name: `${contest}/` }
            dispatch({ type: 'CHALLENGE', data: newData })
        }
    }

    return (
        <ContainerList>
            <Category>
                <span>Contests</span>
            </Category>
            <div id="listOfContests">
                {contents && contents.map((item,i) => {
                    if(item.Key?.slice(-1) === '/') {
                        item.Key = item.Key?.slice(0,-1)
                    }
                    if(!item.Key?.includes('packages') && !item.Key?.includes('requirements.txt')){
                        return (
                            <div key={i}>
                                {item.Key?.split("/").length === 1 ? 
                                    (
                                        <div
                                        key={i+"_div1"}
                                        id={i.toString()}
                                        onClick={() =>{
                                            handleVisibleContest(item.Key?.split("/")[0])
                                        }}
                                        >
                                            <ContestButton contestName={item.Key}
                                            size={
                                                contents.filter((elem: Object) => {
                                                    if(elem.Key && item.Key) {
                                                        return (elem.Key.includes(item.Key) && elem.Key.split('/').length === 2)
                                                    }
                                                    return 0
                                                }).length
                                            }
                                            ></ContestButton>
                                        </div>
                                    ) : item.Key?.split("/").length === 2 && contestsActive?.includes(item.Key?.split('/')[0]) ?
                                    (
                                        <div
                                        key={i+"_div2"}
                                        id={i.toString()}
                                        className={item?.Key.split('/')[0]}
                                        onClick={() => handleSelectChange(item?.Key)}
                                        >
                                            <ChallengeButton challengeName={item?.Key} />
                                        </div>
                                    ) : (<div key={i+"_div3"}></div>)
                                }
                            </div>
                        )
                    }
                    return <div key={i}></div>
                })}
            </div>
        </ContainerList>
    )
}

export default ContestList
