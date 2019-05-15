import axios from 'axios'

const api = axios.create({
    baseURL: 'http://192.168.43.21:3000'
})

export default api