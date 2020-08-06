import React from 'react'
import { useSelector } from 'react-redux'
import base64 from 'base-64'

import { Container, Role, User, Avatar } from './styles'

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

const UserRow: React.FC<User> = ({ user, score }) => {
    return (
        <User>
            <Avatar src={base64.decode(user.imageUrl)} />
            <strong>{user.firstName} {user.lastName}</strong>
            <span>{score}</span>
        </User>
    )
}

const UserList: React.FC = () => {
    const challengeName: string = useSelector((state: any) => state.data.selectedChallenge.name)
    const globalScore: User[] = useSelector((state: any) => state.data.globalScore)
    const listOfUsers: UserApi[] = useSelector((state: any) => state.data.listOfUsers)
    const challengeScore: User[] = useSelector((state: any) => state.data.challengeScore)

    return (
        <Container>
            {challengeName ? <Role>{challengeName.split('/').join(' ').split('_').join(' ')}</Role> : <Role>Global</Role>}
            {challengeScore && challengeScore.length > 0 && listOfUsers ? (
                challengeScore.map(function (element, i) {
                    const getUser: UserApi[] = listOfUsers.filter((element2) => {
                        return element2.userId === element.userId
                    })
                    const user = getUser.pop()
                    if (user) {
                        return <UserRow key={i} user={user} score={element.score} />
                    } else {
                        return <></>
                    }
                })
            ) : globalScore && listOfUsers && !challengeName ? (
                globalScore.map(function (element, i) {
                    const getUser: UserApi[] = listOfUsers.filter((element2) => {
                        return element2.userId === element.userId
                    })
                    const user = getUser.pop()
                    if (user) {
                        return <UserRow key={i} user={user} score={element.score} />
                    } else {
                        return <></>
                    }
                })
            ) : (
                <></>
            )}
        </Container>
    )
}

export default UserList
