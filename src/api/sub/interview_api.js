import axios from 'axios';
import {API_URL} from '../../constant/variables';
import moment from 'moment';

const interview_api = {};

interview_api.getList = async (conditions) => {
  
  return axios({
    url: `${API_URL}/interview/getList`,
    method: 'GET',
    params: conditions
  })
}

interview_api.getDetail = async (id) => {
  return axios({
    url: `${API_URL}/interview/getDetail/${id}`,
    method: 'GET',
  })
}

interview_api.create = async (formData) => {
  return axios({
    url: `${API_URL}/interview/postDetail/`,
    method: 'POST',
    data: formData,
  })
}

interview_api.update = async (formData, id) => {
  return axios({
    url: `${API_URL}/interview/postDetail/${id}`,
    method: 'POST',
    data: formData,
  })
}

interview_api.getListByMonth = async (conditions) => {
  const {activeDate} = conditions;
  let date = moment();
  if(activeDate) {
    date = moment(activeDate).format('YYYY-MM-DD');
  }
  return axios({
    url: `${API_URL}/interview/getListByMonth/${date}`,
    method: 'GET',
  })
}

// interview_api.GetAllInterview = (condition) => {
//   return axios({
//     url: `${API_URL}/scheduleInterview/getList`,
//     method: 'GET',
//     params : condition
//   })
// }

// interview_api.GetTotalInterview = (condition) => {
//   return axios({
//     url: `${API_URL}/scheduleInterview/getListCount`,
//     method: 'GET',
//     params : condition
//   })
// }


// interview_api.CreateInterview = (formData) => {
//   return axios({
//     url: `${API_URL}/scheduleInterview/saveOne`,
//     method: 'POST',
//     data : formData
//   })
// }
// interview_api.UpdateInterview = (data) => {
//   console.log(data);
//   return axios({
//     url: `${API_URL}/scheduleInterview/updateOne`,
//     method: 'PUT',
//     data : data
//   })
// }

export default interview_api;
