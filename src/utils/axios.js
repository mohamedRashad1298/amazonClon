import axios from 'axios'

const instance = await axios.create({
 baseURL:"http://127.0.0.1:5001/fir-54225/us-central1/api"
})

export default instance ; 