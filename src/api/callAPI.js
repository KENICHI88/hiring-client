import axios from 'axios';
import {API_URL} from '../constant/variables';

axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('token');

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if(error.response && error.response.status === 401 && (window.location.href.indexOf('login') < 0 && window.location.href.indexOf('logout') < 0 )) {
    window.location.href = './login';
    return false;
  }
  return Promise.reject(error);
});

export const api_setDefaultHeaderAxios = () => {
  axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('token');
}
//////// START API for ROLE //////

export const api_GetAllRole = () => {
  return axios({
    url: `${API_URL}/role/getlist`,
    method: 'GET'
  })
}

//////// END API for ROLE //////

//////// START API for USER //////
export const api_GetAllUser = () => {
  return axios({
    url: `${API_URL}/user/getlist`,
    method: 'GET'
  })
}

export const api_GetTotalUser = () => {
  return axios({
    url: `${API_URL}/user/getlistCount`,
    method: 'GET'
  })
}

export const api_GetListLeaderWithBusyDate = () => {
  return axios({
    url: `${API_URL}/user/getlistWithBusyDate`,
    method: 'GET'
  })
}

export const api_CreateUser = (values) => {
  return axios({
    url: `${API_URL}/user/saveOne`,
    method: 'POST',
    data : values
  })
}

export const api_SaveUser = (values) => {
  return axios({
    url: `${API_URL}/user/saveOne`,
    method: 'POST',
    data : values
  })
}

export const api_LoginUser = (values, callback, errorHandle) => {
  const rs = axios({
    url: `${API_URL}/user/login`,
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

export const api_ReAuthenticate = (values, callback, errorHandle) => {
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

//////// END API for USER //////

//////// START API for CANDIDATE //////
export const api_GetAllCandidate = (condition) => {
  let cond = {};
  if(condition){
    cond = condition;
  }
  return axios({
    url: `${API_URL}/candidate/getlist`,
    method: 'GET',
    params: cond,
  })
}

export const api_GetCountCandidate = (condition) => {
  let cond = {};
  if(condition){
    cond = condition;
  }
  return axios({
    url: `${API_URL}/candidate/getCountList`,
    method: 'GET',
    params: cond,
  })
}

export const api_CreateCandidate = (formData) => {
  return axios({
    url: `${API_URL}/candidate/saveone`,
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const api_UpdateCandidate = (formData) => {
  let headers = {};
  let url = `${API_URL}/candidate/updateone`;
  if(formData.cv_file) {
    headers = {
      'Content-Type': 'multipart/form-data'
    }
    url = `${API_URL}/candidate/updateoneWithoutFile`
  }
  return axios({
    url: url,
    method: 'POST',
    data: formData,
    headers: headers
  })
}

//////// END API for CANDIDATE //////
export const api_CreateBusyDateTime = (formData) => {
  return axios({
    url: `${API_URL}/scheduleBusy/saveOne`,
    method: 'POST',
    data : formData
  })
}
export const api_GetBusyDateByMonth = (monthYear) => {
  const dateTime = new Date(monthYear);
  const formatedMonthYear = dateTime.getFullYear()+'-'+dateTime.getMonth();
  return axios({
    url: `${API_URL}/scheduleBusy/getBusyDateByMonth/${formatedMonthYear}`,
    method: 'GET',
  });
}
//////// START API for CANDIDATE //////
//////// START API for INTERVIEW //////

export const api_GetAllInterview = (condition) => {
  return axios({
    url: `${API_URL}/scheduleInterview/getList`,
    method: 'GET',
    params : condition
  })
}

export const api_GetTotalInterview = (condition) => {
  return axios({
    url: `${API_URL}/scheduleInterview/getListCount`,
    method: 'GET',
    params : condition
  })
}


export const api_CreateInterview = (formData) => {
  return axios({
    url: `${API_URL}/scheduleInterview/saveOne`,
    method: 'POST',
    data : formData
  })
}
export const api_UpdateInterview = (data) => {
  console.log(data);
  return axios({
    url: `${API_URL}/scheduleInterview/updateOne`,
    method: 'PUT',
    data : data
  })
}
//////// END API for INTERVIEW //////
