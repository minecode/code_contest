import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFetch } from 'src/hooks/useFetch'

import Authentication from '../Authentication'
import { Container, Avatar, UserInfo, Auth } from './styles'

import { Data, Challenge, User, UserApi, ChallengeContent } from '../Utils'

const Navbar: React.FC = () => {
    const dispatch = useDispatch()
    const data = useSelector((state: Data) => state.data)
    const dataAuth = useSelector((state: Data) => state.data.auth)
    const userId = useSelector((state: Data) => state.data.auth.user.id)
    const challengeName = useSelector((state: Data) => state.data.selectedChallenge.name)

    const { data: globalScore } = useFetch<User[]>('https://code-contest-backend.herokuapp.com/contests/global')
    const { data: listOfUsers } = useFetch<UserApi[]>('https://code-contest-backend.herokuapp.com/contests/user')
    const { data: challengeScore } = useFetch<User[]>(`https://code-contest-backend.herokuapp.com/contests/global/${challengeName}`)
    const { data: userScore } = useFetch<User[]>(`https://code-contest-backend.herokuapp.com/contests/${userId}/${challengeName}`)
    const { data: challengeIndex } = useFetch<ChallengeContent>(`/contents/${challengeName?.split(' ').join('_')}/index.md`)
    const { data: challengeList } = useFetch<Challenge[]>(`https://code-contest-backend.herokuapp.com/contests/list/${userId}`)
    useEffect(() => {
        const newData = { data: data }

        globalScore ? newData.data.globalScore = globalScore : 
        listOfUsers ? newData.data.listOfUsers = listOfUsers : 
        challengeScore ? newData.data.challengeScore = challengeScore : 
        userScore ? newData.data.userScore = userScore : 
        challengeIndex ? newData.data.challengeIndex = challengeIndex : 
        challengeList ? newData.data.challengeList = challengeList : 

        dispatch({ type: 'CHALLENGE', data: newData })
    }, [globalScore, listOfUsers, challengeScore, userScore, challengeIndex, challengeList, dispatch, data])

    return (
        <Container>
            {dataAuth.authenticated ? (
                <UserInfo>
                    <span>Welcome, {dataAuth.user.name}!</span>
                    <Avatar src={dataAuth.user.image} />
                </UserInfo>
            ) : (
                <></>
            )}
            <Auth>
                <Authentication />
            </Auth>
        </Container>
    )
}

export default Navbar
