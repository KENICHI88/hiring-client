import {api_LoginUser} from '../api/callAPI';

const userController = {};

export const userLogin = (dataForm, callback) => {
  api_LoginUser(dataForm,
    response => {
      callback(response.data);
    },
    (error) => {
      console.log(error);
    });
}

export const userVerifyLocal = () => {
  
}


userController.userLogin = userLogin;

export default userController;
