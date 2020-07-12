import axios from 'axios';
import {API_URL} from '../../constant/variables';

const permission_api = {};

permission_api.getList = async (conditions) => {
  const rs = await axios({
    url: `${API_URL}/permission/getList`,
    method: 'GET',
    params: conditions
  });
  return rs;
}

permission_api.getDetail = async (id) => {
  const rs = axios({
    url: `${API_URL}/permission/getDetail/${id}`,
    method: 'GET',
  })
  return rs;
}

permission_api.create = async (formData) => {
  const rs = axios({
    url: `${API_URL}/permission/postDetail/`,
    method: 'POST',
    data: formData,
  })
  return rs;
}

permission_api.update = async (formData, id) => {
  const rs = axios({
    url: `${API_URL}/permission/postDetail/${id}`,
    method: 'POST',
    data: formData,
  })
  return rs;
}

export default permission_api;
