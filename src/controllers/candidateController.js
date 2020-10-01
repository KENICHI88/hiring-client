import {api_GetAllCandidate} from '../api/callAPI';

const candidateController = {};

const getAllCandidate = (condition) => {
  return api_GetAllCandidate(condition);
}

const getListAvailableCandidate = () => {
  return api_GetAllCandidate();
}

candidateController.getAllCandidate = getAllCandidate;
candidateController.getListAvailableCandidate = getListAvailableCandidate;

export default candidateController;
