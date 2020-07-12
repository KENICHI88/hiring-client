import {interview_api} from '../api/callAPI';

const interviewController = {};

export const getList = (condition, callback) => {
  const rs = interview_api.getList(condition);
  rs.then(data => {
    if(data.status === 200) {
      callback(data.data);
    }
  })
  .catch(error => {
    console.log(error);
  })
}

export const getDetail = (id, callback) => {
  const rs = interview_api.getDetail(id);
  rs.then(data => {
    if(data.status === 200) {
      callback(data.data);
    }
  })
  .catch(error => {
    console.log(error);
  })
}

export const postDetail = (formData, callback) => {
  
  const {_id} =  formData;
  let rs = null;
  if(_id !== '') {
    rs = interview_api.update(formData, _id);
  }else {
    delete formData._id;
    rs = interview_api.create(formData);
  }
  rs.then(data=> {
    if(data.status === 200) {
      callback(data.data);
    }
  }).catch(error => {
    console.log(error);
  })
}


interviewController.getList = getList;
interviewController.getDetail = getDetail;
interviewController.postDetail = postDetail;

export default interviewController;
