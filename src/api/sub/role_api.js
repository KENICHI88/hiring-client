import axios from 'axios';
import {API_URL} from '../../constant/variables';

const role_api = {};

role_api.getList = async (conditions) => {
  const rs = await axios({
    url: `${API_URL}/role/getList`,
    method: 'GET',
    params: conditions
  });
  return rs;
}

role_api.getDetail = async (id) => {
  const rs = axios({
    url: `${API_URL}/role/getDetail/${id}`,
    method: 'GET',
  })
  return rs;
}

role_api.create = async (formData) => {
  const rs = axios({
    url: `${API_URL}/role/postDetail/`,
    method: 'POST',
    data: formData,
  })
  return rs;
}

role_api.update = async (formData, id) => {
  const rs = axios({
    url: `${API_URL}/role/postDetail/${id}`,
    method: 'POST',
    data: formData,
  })
  return rs;
}

export default role_api;
