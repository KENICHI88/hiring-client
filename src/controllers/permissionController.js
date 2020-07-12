import {permission_api} from '../api/callAPI';

const permissionController = {};

export const getList = (condition, callback) => {
  const rs = permission_api.getList(condition);
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
  const rs = permission_api.getDetail(id);
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
    rs = permission_api.update(formData, _id);
  }else {
    delete formData._id;
    rs = permission_api.create(formData);
  }
  
  rs.then(data=> {
    if(data.status === 200) {
      callback(data.data);
    }
  }).catch(error => {
    console.log(error);
  })
}


permissionController.getList = getList;
permissionController.getDetail = getDetail;
permissionController.postDetail = postDetail;

export default permissionController;
