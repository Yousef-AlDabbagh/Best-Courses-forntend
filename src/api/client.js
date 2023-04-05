
//Axios is a promised-based HTTP client for JavaScript. It has the ability to make HTTP requests from the browser and handle the transformation of request and response data.
import axios from "axios";
const client = axios.create({baseURL:"https://best-courses-backend.onrender.com/api"})
export default client;