import axios from 'axios'

const apiCodeContest = axios.create({
    baseURL: 'https://code-contest-backend.herokuapp.com/contests'
})

export default apiCodeContest
