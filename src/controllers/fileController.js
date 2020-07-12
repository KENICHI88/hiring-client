import {file_api} from '../api/callAPI';

const fileController = {};

export const getList = (condition, callback) => {
  const rs = file_api.getList(condition);
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
  const rs = file_api.getDetail(id);
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
  
  const myInfo = JSON.parse(localStorage.getItem('userInfor'));
  
  let localFormData = new FormData(formData.target);
  
  if(formData) {
    Object.keys(formData).map(key => {
      if(key === '_id' && formData[key] === ''){
        localFormData.append(`createrId`, myInfo._id);
      }else {
        if(key!='upload_file') {
          localFormData.append(`${key}`, `${formData[key]}`);
        }
      }
    });
    localFormData.append('upload_file', formData.upload_file);
  }
  
  if(_id !== '') {
    rs = file_api.update(localFormData, _id);
  }else {
    delete localFormData._id;
    rs = file_api.create(localFormData);
  }
  
  rs.then(data=> {
    if(data.status === 200) {
      callback(data.data);
    }
  }).catch(error => {
    console.log(error);
  })
}


fileController.getList = getList;
fileController.getDetail = getDetail;
fileController.postDetail = postDetail;

export default fileController;
