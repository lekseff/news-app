import axios from 'axios'

const instance = axios.create({
  timeout: 60_000,
})

export default instance
