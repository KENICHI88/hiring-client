import axios from 'axios';
import {API_URL} from '../../constant/variables';

const offer_api = {};

offer_api.getList = async (conditions) => {
  return axios({
    url: `${API_URL}/offer/getList`,
    method: 'GET',
    params: conditions
  })
}

offer_api.getDetail = async (id) => {
  return axios({
    url: `${API_URL}/offer/getDetail/${id}`,
    method: 'GET',
  })
}

offer_api.create = async (formData) => {
  return axios({
    url: `${API_URL}/offer/postDetail/`,
    method: 'POST',
    data: formData,
  })
}

offer_api.update = async (formData, id) => {
  return axios({
    url: `${API_URL}/offer/postDetail/${id}`,
    method: 'POST',
    data: formData,
  })
}

export default offer_api;
