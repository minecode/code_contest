import axios from 'axios'

const apiDatabase = axios.create({
    baseURL: 'https://code-contest-backend.herokuapp.com/contests'
})

export default apiDatabase
