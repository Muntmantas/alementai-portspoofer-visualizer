import axios from "axios";
//import { IP_ADDRESS } from "../Routes"; 

export default axios.create({
   baseURL: `http://193.219.91.103:5001/honeypots` //pass in the url of our backend server
})

