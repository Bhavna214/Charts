import axios from 'axios'

const instance = axios.create({
    baseURL:"https://bugsquashers1.herokuapp.com",
})

export default instance;