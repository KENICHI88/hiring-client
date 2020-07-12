import axios from 'axios';
import {API_URL} from '../../constant/variables';

const candidate_api = {};

candidate_api.GetAllCandidate = (condition) => {
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

candidate_api.GetCountCandidate = (condition) => {
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

candidate_api.CreateCandidate = (formData) => {
  return axios({
    url: `${API_URL}/candidate/saveone`,
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

candidate_api.UpdateCandidate = (formData) => {
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

export default candidate_api;
