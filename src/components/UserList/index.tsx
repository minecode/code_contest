import React from 'react'
import { useSelector } from 'react-redux'
import base64 from 'base-64'

import { Container, Role, User as UserElem, Avatar } from './styles'

import { User, UserApi, Data } from '../Utils'

const UserRow: React.FC<User> = ({ user, score }) => {
    return (
        <UserElem>
            <Avatar src={base64.decode(user.imageUrl)} />
            <strong>{user.firstName} {user.lastName}</strong>
            <span>{score}</span>
        </UserElem>
    )
}

const UserList: React.FC = () => {
    const challengeName: string = useSelector((state: Data) => state.data.selectedChallenge.name)
    const globalScore: User[] = useSelector((state: Data) => state.data.globalScore)
    const listOfUsers: UserApi[] = useSelector((state: Data) => state.data.listOfUsers)
    const challengeScore: User[] = useSelector((state: Data) => state.data.challengeScore)

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
