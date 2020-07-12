import axios from 'axios';
import {API_URL} from '../../constant/variables';

const team_api = {};

team_api.getList = async (conditions) => {
  
  return axios({
    url: `${API_URL}/team/getList`,
    method: 'GET',
    params: conditions
  })
}

team_api.getDetail = async (id) => {
  return axios({
    url: `${API_URL}/team/getDetail/${id}`,
    method: 'GET',
  })
}

team_api.create = async (formData) => {
  return axios({
    url: `${API_URL}/team/postDetail/`,
    method: 'POST',
    data: formData,
  })
}

team_api.update = async (formData, id) => {
  return axios({
    url: `${API_URL}/team/postDetail/${id}`,
    method: 'POST',
    data: formData,
  })
}

export default team_api;
