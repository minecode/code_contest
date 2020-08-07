import React, { useCallback, useState } from 'react'

import { ContainerList, Category } from './styles'

import ChallengeButton from '../ChallengeButton'
import ContestButton from '../ContestButton'
import { useFetch } from 'src/hooks/useFetch'
import { useSelector, useDispatch } from 'react-redux'

import { Challenge, Contest, Data } from '../Utils'

const ContestList: React.FC = () => {
    const dispatch = useDispatch()
    const data = useSelector((state: Data) => state.data)

    const [contestsActive, setContestsActive] = useState<string>('')

    const { data: dataTree } = useFetch<Contest>(
        '/git/trees/45a03b077a6c35310942f1f493a3a9c3f042f6c4?recursive="true"'
    )

    const handleSelectChange = useCallback(
        (contest: string) => {
            const newData = { data: data }

            newData.data.selectedChallenge = { name: `${contest}` }

            dispatch({ type: 'CHALLENGE', data: newData })
        },
        [dispatch, data]
    )

    const handleVisibleContest = (contest: string) => {
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
                {dataTree?.tree
          .filter((contest: Challenge) => {
              return (!contest.path.includes('.github') && (contest.path.split('/').length === 1 || (contest.path.split('/').length === 2 && contest.path.split('/')[1] !== 'requirements.txt')))
          })
          .map((contest: Challenge, i: number) => (
              <div key={i}>
                  {contest.path.split('/').length === 1 ? (
                      <div
                          key={i}
                          id={i.toString()}
                          onClick={() =>
                              handleVisibleContest(contest.path.split('/')[0])
                          }
                      >
                          <ContestButton
                              contestName={contest.path}
                              size={
                                  dataTree.tree.filter((elem:Challenge) => {
                                      return (elem.path.includes(contest.path) &&
                          elem.path.split('/').length === 2 && elem.path.split('/')[1] !== 'requirements.txt'
                                      )
                                  }).length
                              }
                          ></ContestButton>
                      </div>
                  ) : contest.path.split('/').length === 2 &&
                contestsActive.includes(contest.path.split('/')[0]) ? (
                          <div
                              key={i}
                              id={i.toString()}
                              className={contest.path.split('/')[0]}
                              onClick={() => handleSelectChange(contest.path)}
                          >
                              <ChallengeButton challengeName={contest.path} />
                          </div>
                      ) : (
                          <></>
                      )}
              </div>
          ))}
            </div>
        </ContainerList>
    )
}

export default ContestList
