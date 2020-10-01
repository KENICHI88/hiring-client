import {
  api_GetTotalUser,
  api_GetTotalInterview,
  api_GetCountCandidate,
} from '../api/callAPI';

const dashboardController = {};

const getTotalUser = (condition) => {
  return api_GetTotalUser(condition);
}

const getTotalInterview = (condition) => {
  const now = new Date();
  let conditions = {
    ...condition,
    activeDate : condition.activeDate ? condition.activeDate : now.toISOString()
  }
  return api_GetTotalInterview(conditions);
}

const getTotalCandidate = (condition) => {
  const now = new Date();
  let conditions = {
    ...condition,
    activeDate : condition.activeDate ? condition.activeDate : now.toISOString()
  }
  return api_GetCountCandidate(conditions);
}

dashboardController.getTotalUser = getTotalUser;
dashboardController.getTotalInterview = getTotalInterview;
dashboardController.getTotalCandidate = getTotalCandidate;

export default dashboardController;
