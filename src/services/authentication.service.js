import {BehaviorSubject} from 'rxjs';

import {handleResponse} from '../helpers/handle-response';

import {api_LoginUser, api_ReAuthenticate} from '../api/callAPI';

export const authenticationService = {
  login,
  logout,
  reAuthenticate,
  getCurrentInforLocal: getCurrentInforLocal,
  isAdmin: isAdmin,
  get currentUserValue () { return getCurrentInforLocal() }
}

function login(dataForm) {
  return api_LoginUser(dataForm);
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
  const localData = localStorage.getItem('currentUser'),
        token = localStorage.getItem('token');
  return api_ReAuthenticate({token: token}, callback, errorHandle);
}

function isAdmin(){
  let rs = false;
  const localData = JSON.parse(localStorage.getItem('userInfor'));
  if(localData && (localData.team == 'hr_team' || localData.team == 'admin_team' )) {
    rs = true;
  }
  
  return rs;
}

function logout() {
  localStorage.removeItem('currentUser');
  window.location = '/login';
}
