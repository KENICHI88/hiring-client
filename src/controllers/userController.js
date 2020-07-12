import {user_api} from '../api/callAPI';
const userController = {};

export const userLogin = (dataForm, callback) => {
  user_api.loginUser(dataForm,
    response => {
      callback(response.data);
    },
    (error) => {
      console.log(error);
    });
}

export const getList = (conditions, callback) => {
  
  const rs = user_api.getList(conditions);
  rs.then(response => {
    if(response.status === 200) {
      callback(response.data);
    }
  }).catch(error => {
    console.log(error);
  });
}

export const getDetail = (id, callback) => {
  const rs = user_api.getDetail(id);
  rs.then(response => {
    if(response.status === 200) {
      callback(response.data);
    }
  })
  .catch(error => {
    console.log(error);
  })
}

export const postDetail = (formData, callback) => {
  
  const {_id} =  formData;
  let rs = null;
  
  if(formData.teamId ==='') {
    delete formData.teamId
  }
  if(_id !== '') {
    rs = user_api.update(formData, _id);
  }else {
    formData.password = '123456789';
    delete formData._id;
    rs = user_api.create(formData);
  }
  rs.then(data=> {
    if(data.status === 200) {
      callback(data.data);
    }
  }).catch(error => {
    console.log(error);
  })
}

export const getListCandidateAvailable = (id, callback) => {
  const rs = user_api.getListCandidateAvailable(id);
  rs.then(response => {
    if(response.status === 200) {
      callback(response.data);
    }
  })
  .catch(error => {
    console.log(error);
  })
}

export const getListCandidatePassed = (id, callback) => {
  const rs = user_api.getListCandidatePassed(id);
  rs.then(response => {
    if(response.status === 200) {
      callback(response.data);
    }
  })
  .catch(error => {
    console.log(error);
  })
}

userController.userLogin = userLogin;
userController.getList = getList;
userController.getDetail = getDetail;
userController.postDetail = postDetail;
userController.getListCandidateAvailable = getListCandidateAvailable;
userController.getListCandidatePassed = getListCandidatePassed;

export default userController;
