import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFetch } from 'src/hooks/useFetch'

import Authentication from '../Authentication'
import { Container, Avatar, UserInfo, Auth } from './styles'

interface User {
    userId?: string;
    user: UserApi;
    score: number;
}

interface UserApi {
    userId: string;
    firstName: string;
    lastName: string;
    imageUrl: string;
}

interface Challenge {
  name: string;
  content: string;
}

const Navbar: React.FC = () => {
    const dispatch = useDispatch()
    const data = useSelector((state: any) => state.data)
    const dataAuth = useSelector((state: any) => state.data.auth)
    const userId = useSelector((state: any) => state.data.auth.user.id)
    const challengeName = useSelector((state: any) => state.data.selectedChallenge.name)

    const { data: globalScore } = useFetch<User[]>('http://localhost:4001/contests/global')
    const { data: listOfUsers } = useFetch<UserApi[]>('http://localhost:4001/contests/user')
    const { data: challengeScore } = useFetch<User[]>(`http://localhost:4001/contests/global/${challengeName}`)
    const { data: userScore } = useFetch<User[]>(`http://localhost:4001/contests/${userId}/${challengeName}`)
    const { data: challengeIndex } = useFetch<Challenge>(`/contents/contests/${challengeName?.split(' ').join('_')}/index.md`)
    const { data: challengeList } = useFetch<Challenge>(`http://localhost:4001/contests/list/${userId}`)
    useEffect(() => {
        const newData = { data: data }

        newData.data.globalScore = globalScore || null
        newData.data.listOfUsers = listOfUsers || null
        newData.data.challengeScore = challengeScore || null
        newData.data.userScore = userScore || null
        newData.data.challengeIndex = challengeIndex || null
        newData.data.challengeList = challengeList || null

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
