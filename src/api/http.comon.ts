import axios from "axios";
export default axios.create({
  baseURL: "https://transaction-api-challenge.herokuapp.com/api",
  headers: {
    "Content-type": "application/json",
    }
});

  export const headers = {
  'Content-Type': 'application/json',
  "auth-token": `${localStorage.getItem('token')}`,
  
}