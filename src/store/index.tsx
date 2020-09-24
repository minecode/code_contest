import { createStore } from 'redux'

const INITIAL_STATE = {
    data: {
        auth: {
            authenticated: false,
            user: {
                id: null,
                name: null,
                surname: null,
                image: null
            },
            token: null
        },
        selectedChallenge: {
            name: null
        },
        globalScore: null,
        listOfUsers: null,
        challengeScore: null,
        userScore: null,
        challengeIndex: null,
        challengeList: null,
        contents: null
    }
}

function globalStore (state: any, action: any) {
    switch (action.type) {
    case 'LOGIN':
        return action.data
    case 'LOGOUT':
        return action.data
    case 'CHALLENGE':
        return action.data
    default:
        return INITIAL_STATE
    }
}

const store = createStore(globalStore)

export default store
