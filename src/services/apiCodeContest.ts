import axios from 'axios'

const apiCodeContest = axios.create({
    baseURL: 'https://api.github.com/repos/minecode/code_contest_responses'
})

export default apiCodeContest
