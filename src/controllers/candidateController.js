import {candidate_api} from '../api/callAPI';

const candidateController = {};

const getAllCandidate = (condition) => {
  return candidate_api.GetAllCandidate(condition);
}

const getListAvailableCandidate = () => {
  return candidate_api.GetAllCandidate();
}

candidateController.getAllCandidate = getAllCandidate;
candidateController.getListAvailableCandidate = getListAvailableCandidate;

export default candidateController;
