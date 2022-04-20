import axios from 'axios'

const service = axios.create({
  baseURL: "http://127.0.0.1:8000/api/", // url = base url + request url
  timeout: 5000
  // withCredentials: true // send cookies when cross-domain requests
})

export default service
