//import config from "../config.json";
import axios from "axios";
import token from "./Token";

//API endpoint
//const APIEndpoint = config.DOMAIN_NAME + '/auth';
const APIEndpoint = "https://agri-mart-web-server.onrender.com/";
//const APIEndpoint = process.env.backend


const register = (data) =>
  //console.log(data);
  new Promise((resolve, reject) => {
    console.log(APIEndpoint)
    console.log("data ",data);
    const headers= {Authorization: `Bearer ${token.getAccessToken()}`}
    const url = APIEndpoint+'admin/register';
    axios
    .post(url, data,headers)
    .then((res) => {
      
    if (res.request.status === 200 || res.request.status === 201){
        resolve(res.data.message);
    } else {
        reject(res.data.message);
    }
    })
    .catch((err) => {
      reject(err);
    });
});

const getusertypes = () => {
  return axios({
    method: "get",
    url: APIEndpoint + '/user-types',
    headers: {Authorization: `Bearer ${token.getAccessToken()}`}
  });
};


const login = async (data) => 
  new Promise((resolve, reject) => {
  console.log("data ",data);
  const url = APIEndpoint;
  axios
  .post(url, data)
  .then((res) => {
    console.log("sadsad",res);
    
  if (res.request.status === 200 || res.request.status === 201) {
      token.setAccessToken(res.data.access_token);
      resolve(res.data.user);
  } else {
      console.log("aasffasd")
      reject(res.data.message);
  }
  })
  .catch((err) => {
    console.log("catch"+err);
    reject(err);
  });
});

const logout = async (data) => {
  return axios({
    method: "get",
    url: APIEndpoint + '/logout',
  });
}

export default {
  register,
  login,
  getusertypes,
  logout,
}

