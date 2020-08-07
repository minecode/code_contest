export function titleCase (str: string) {
    str = str.split('_').join(' ')
    const splitStr = str.toLowerCase().split(' ')
    for (let i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
    }
    // Directly return the joined string
    return splitStr.join(' ')
}



export interface Contest {
    tree: Challenge[];
}

export interface Challenge {
    id: string;
    userId: string;
    contestId: string;
    challengeId: string;
    score: number;
    path: string;
}

export interface ChallengeContent {
    content: string
}

export interface Data {
    data: {
        auth: {
            authenticated: boolean,
            user: {
                id: string,
                name: string,
                surname: string,
                image: string
            },
            token: string
        },
        selectedChallenge: {
            name: string
        },
        globalScore: User[],
        listOfUsers: UserApi[],
        challengeScore: User[],
        userScore: User[],
        challengeIndex: ChallengeContent,
        challengeList: Challenge[]
    }
}


export interface User {
    userId?: string;
    user: UserApi;
    score: number;
}

export interface UserApi {
    userId: string;
    firstName: string;
    lastName: string;
    imageUrl: string;
}