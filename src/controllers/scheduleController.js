import {api_GetBusyDateByMonth} from '../api/callAPI';

const scheduleController = {};

export const leaderConfirmInterview = (interviewId, status) => {
  
}

export const getBusyDateByMonth = (monthYear, callback, errorHandler) => {
  const rs = api_GetBusyDateByMonth(monthYear);
  rs.then(data => {
    callback(data);
  }).catch(error => {
    errorHandler(error);
  })
}

scheduleController.leaderConfirmInterview = leaderConfirmInterview;

export default scheduleController;
