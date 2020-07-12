import {offer_api} from '../api/callAPI';

const offerController = {};

export const getList = (condition, callback) => {
  const rs = offer_api.getList(condition);
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
  const rs = offer_api.getDetail(id);
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
  if(_id !== '') {
    rs = offer_api.update(formData, _id);
  }else {
    delete formData._id;
    formData.createrId = myInfo._id;
    rs = offer_api.create(formData);
  }
  
  rs.then(data=> {
    if(data.status === 200) {
      callback(data.data);
    }
  }).catch(error => {
    console.log(error);
  })
}


offerController.getList = getList;
offerController.getDetail = getDetail;
offerController.postDetail = postDetail;

export default offerController;
