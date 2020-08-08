import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar'
import UserList from '../UserList'
import LoginMessage from '../LoginMessage'
import ChallengeInfo from '../ChallengeInfo'
import ChallengeCode from '../ChallengeCode'
import ContestList from '../ContestList'
import { Grid, Container } from './styles'
import { useFetch } from 'src/hooks/useFetch'
import { useSelector, useDispatch } from 'react-redux'
import { Data, Challenge as ChallengeInterface, User, UserApi, ChallengeContent, Contest } from '../Interface'

const Layout: React.FC = () => {
    const dispatch = useDispatch()
    const data = useSelector((state: Data) => state.data)
    const userId = useSelector((state: Data) => state.data.auth.user.id)
    const authenticated = useSelector((state: Data) => state.data.auth.authenticated)
    const selectedChallengeName = useSelector((state: Data) => state.data.selectedChallenge.name)

    const { data: globalScore } = useFetch<User[]>('https://code-contest-backend.herokuapp.com/contests/global')
    const { data: listOfUsers } = useFetch<UserApi[]>('https://code-contest-backend.herokuapp.com/contests/user')
    const { data: challengeList } = useFetch<ChallengeInterface[]>(`https://code-contest-backend.herokuapp.com/contests/list/${userId}`)
    const { data: challengeIndex } = useFetch<ChallengeContent>(`/contents/${selectedChallengeName?.split(' ').join('_')}/index.md`)
    const { data: challengeScore } = useFetch<User[]>(`https://code-contest-backend.herokuapp.com/contests/global/${selectedChallengeName}`)
    const { data: userScore } = useFetch<User[]>(`https://code-contest-backend.herokuapp.com/contests/${userId}/${selectedChallengeName}`)
    const { data: dataTree } = useFetch<Contest>('/git/trees/5c51dbca32b9394fe304b519826c1364806cdb9e?recursive="true"')

    const [load, setLoad] = useState(false)

    useEffect(() => {
        const newData = { data: data }
        if (globalScore && listOfUsers && challengeScore && userScore && challengeList && dataTree) {
            console.log('entrou')
            newData.data.globalScore = globalScore
            newData.data.listOfUsers = listOfUsers
            newData.data.challengeScore = challengeScore
            newData.data.userScore = userScore
            newData.data.challengeList = challengeList
            newData.data.tree = dataTree
            setLoad(true)
        }
        if (challengeIndex) {
            newData.data.challengeIndex = challengeIndex

        }
        dispatch({ type: 'CHALLENGE', data: newData })
    }, [globalScore, listOfUsers, challengeScore, userScore, challengeIndex, challengeList, dataTree, dispatch, data])

    return (
        <Grid>
            {load ?
            <>
                <Navbar />
                <ContestList />
                <Container>
                    {selectedChallengeName && selectedChallengeName.split('/').length > 1 && selectedChallengeName.split('/')[1].length > 1 ? (
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
                </Container>
                <UserList />
            </>
            : <></> }
        </Grid>
    )
}

export default Layout
