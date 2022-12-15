import axios from "axios"; // axios is a library that allows us to make HTTP requests

const client = axios.create({
  baseURL: "https://ims-server-m8on.onrender.com/api/v1",
  // baseURL: "http://localhost:4000/api/v1",
});

const token = JSON.parse(localStorage.getItem("token"));
if (token?.token) {
  client.defaults.headers.common["Authorization"] = `Bearer ${token.token}`;
}

export default client;
