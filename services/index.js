import axios from 'axios'

const api = axios.create({
    baseURL: 'https://serverwatsonchatbot.herokuapp.com'
})

export default api