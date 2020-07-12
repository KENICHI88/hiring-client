import {role_api} from '../api/callAPI';

const roleController = {};

export const getList = (condition, callback) => {
  const rs = role_api.getList(condition);
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
  const rs = role_api.getDetail(id);
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
    rs = role_api.update(formData, _id);
  }else {
    delete formData._id;
    rs = role_api.create(formData);
  }
  
  rs.then(data=> {
    if(data.status === 200) {
      callback(data.data);
    }
  }).catch(error => {
    console.log(error);
  })
}


roleController.getList = getList;
roleController.getDetail = getDetail;
roleController.postDetail = postDetail;

export default roleController;
