import axios from 'axios';
import {API_URL} from '../../constant/variables';

//////// START API for USER //////
const user_api = {};

user_api.getList = (conditions) => {
  console.log(conditions);
  return axios({
    url: `${API_URL}/user/getList`,
    method: 'GET',
    params: conditions
  })
}
user_api.getDetail = async (id) => {
  return axios({
    url: `${API_URL}/user/getDetail/${id}`,
    method: 'GET',
  })
}

user_api.getTotal = (conditions) => {
  return axios({
    url: `${API_URL}/user/getTotal`,
    method: 'GET',
    params: conditions
  })
}


user_api.create = (values) => {
  return axios({
    url: `${API_URL}/user/postDetail`,
    method: 'POST',
    data : values
  })
}

user_api.update = (values, id) => {
  return axios({
    url: `${API_URL}/user/postDetail/${id}`,
    method: 'POST',
    data : values
  })
}

user_api.loginUser = (values, callback, errorHandle) => {
  const rs = axios({
    url: `${API_URL}/user/postLogin`,
    method: 'POST',
    data: values
  }).then(data => {
    if(data.status === 200) {
      callback(data);
    }
  }).catch(error => {
    if(errorHandle && typeof errorHandle === 'function') {
      errorHandle(error);
    }
  }) 
}

user_api.getListCandidateAvailable = () => {
  return axios({
    url: `${API_URL}/user/getListCandidateAvailable`,
    method: 'GET'
  })
}

user_api.getListCandidatePassed = () => {
  return axios({
    url: `${API_URL}/user/getListCandidatePassed`,
    method: 'GET'
  })
}

/////
user_api.getListLeaderWithBusyDate = () => {
  return axios({
    url: `${API_URL}/user/getlistWithBusyDate`,
    method: 'GET'
  })
}

user_api.reAuthenticate = (values, callback, errorHandle) => {
  const rs = axios({
    url: `${API_URL}/user/reAuthentication`,
    method: 'POST',
    data: values
  }).then(data => {
    if(data.status === 200) {
      callback(data);
    }
  }).catch(error => {
    if(errorHandle && typeof errorHandle === 'function') {
      errorHandle(error);
    }
  }) 
}

export default user_api;
//////// END API for USER //////
