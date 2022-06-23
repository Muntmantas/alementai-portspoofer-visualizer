import axios from "axios";

export default axios.create({
    baseURL: `http://193.219.91.103:5001/dashboard` //pass in the url of our backend server
})