
import { authHeader, handleResponse } from 'helpers';
export const userService = {
  getAll,
}

function getAll() {
  const requestOptions = {method: 'GET', headers: authenHeader()};
  return fetch(`http://localhost:3000/users`, requestOptions).then(handleResponse);
}
