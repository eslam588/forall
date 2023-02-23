import axios from "axios";


let baseUrl = axios.create({
    baseURL : 'https://forall.sa', 
})

export default baseUrl