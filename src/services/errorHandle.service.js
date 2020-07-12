

function redirect(path) {
  window.location = path;
}

function verifyError(error) {
  let message = '';
  if(error.status){
    switch(error.status){
      case 401:
        return {isError: true, message: 'Your session is expired, please login again.'}
        break;
      case 404 :
        return {isError: true, message: 'Your request doesn\'t exist'}
        break;
      case 500:
      default:
        return {isError: true, message: 'Your request doesn\'t success. Please try again'}
        break;
    }
  }
}

export const errorHandle = {
  redirect : redirect,
  verifyError : verifyError
};
