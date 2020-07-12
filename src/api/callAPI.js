import axios from 'axios';
// import {API_URL} from '../constant/variables';
import user_API from './sub/user_api';
import role_API from './sub/role_api';
import candidate_API from './sub/candidate_api';
import scheduleBusy_API from './sub/scheduleBusy_api';
import interview_API from './sub/interview_api';
import team_API from './sub/team_api';
import file_API from './sub/file_api';
import offer_API from './sub/offer_api';
import permission_API from './sub/permission_api';

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


const api = {};

export const user_api = user_API;
export const role_api = role_API;
export const candidate_api = candidate_API;
export const scheduleBusy_api = scheduleBusy_API;
export const interview_api = interview_API;
export const team_api = team_API;
export const file_api = file_API;
export const offer_api = offer_API;
export const permission_api = permission_API;

export default api;



//////// END API for ROLE //////


//////// START API for CANDIDATE //////


//////// END API for CANDIDATE //////

//////// START API for CANDIDATE //////
//////// START API for INTERVIEW //////


//////// END API for INTERVIEW //////
