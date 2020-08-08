
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
        challengeList: Challenge[],
        tree: Contest
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

export interface BodyRequest {
    message: string,
    committer: {
        name: string,
        email: string
    },
    content: string,
    sha?: string
}
