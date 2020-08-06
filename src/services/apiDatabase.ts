import axios from 'axios'

const apiCodeContest = axios.create({
    baseURL: 'http://localhost:4001/contests'
})

export default apiCodeContest
