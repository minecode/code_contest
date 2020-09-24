import axios from 'axios'

const auth = axios.create({
  baseURL: 'https://codecontestf6f8446e-f6f8446e-dev.auth.us-east-1.amazoncognito.com/'
})
auth.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'

export default auth