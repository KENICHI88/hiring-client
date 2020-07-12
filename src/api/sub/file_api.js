import axios from 'axios';
import {API_URL} from '../../constant/variables';

const file_api = {};

file_api.getList = async (conditions) => {
  
  return axios({
    url: `${API_URL}/file/getList`,
    method: 'GET',
    params: conditions
  })
}

file_api.getDetail = async (id) => {
  return axios({
    url: `${API_URL}/file/getDetail/${id}`,
    method: 'GET',
  })
}

file_api.create = async (formData) => {
  return axios({
    url: `${API_URL}/file/postDetail/`,
    method: 'POST',
    data: formData,
  })
}

file_api.update = async (formData, id) => {
  return axios({
    url: `${API_URL}/file/postDetail/${id}`,
    method: 'POST',
    data: formData,
  })
}

export default file_api;
