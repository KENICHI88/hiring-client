import {team_api} from '../api/callAPI';

const teamController = {};

export const getList = (condition, callback) => {
  const rs = team_api.getList(condition);
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
  const rs = team_api.getDetail(id);
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
    rs = team_api.update(formData, _id);
  }else {
    delete formData._id;
    rs = team_api.create(formData);
  }
  
  rs.then(data=> {
    if(data.status === 200) {
      callback(data.data);
    }
  }).catch(error => {
    console.log(error);
  })
}


teamController.getList = getList;
teamController.getDetail = getDetail;
teamController.postDetail = postDetail;

export default teamController;
