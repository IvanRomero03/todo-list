import axios from "axios";

const client = axios.create({
  baseURL: "https://to-do-app-back-end-express.herokuapp.com",
  //baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default client;
