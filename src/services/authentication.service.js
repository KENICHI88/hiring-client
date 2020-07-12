// import {BehaviorSubject} from 'rxjs';

// import {handleResponse} from '../helpers/handle-response';

import * as api from '../api/callAPI';
console.log(api);
export const authenticationService = {
  login,
  logout,
  reAuthenticate,
  getCurrentInforLocal: getCurrentInforLocal,
  get currentUserValue () { return getCurrentInforLocal() }
}

function login(dataForm) {
  // return user_api.loginUser(dataForm);
}

function getCurrentInforLocal() {
  try {
    let info = JSON.parse(localStorage.getItem('userInfor'));
    return info;
  }catch {
    return null;
  }
}

function reAuthenticate(callback, errorHandle){
  // const localData = localStorage.getItem('currentUser'),
  //       token = localStorage.getItem('token');
  // return api_ReAuthenticate({token: token}, callback, errorHandle);
}

function logout() {
  localStorage.removeItem('currentUser');
  window.location = '/login';
}
