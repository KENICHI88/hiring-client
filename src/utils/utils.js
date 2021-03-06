import { useEffect } from 'react';
import {API_URL} from '../constant/variables';


export function useEffectAsync(effect, inputs) {
  useEffect(() => {
    effect();
  }, inputs);
}


export function filterCandidateStatusByCondition(listStatus, condition) {
  if(!listStatus) {
    return null;
  }
  let reg = '';
  switch(condition) {
    case '201':
      reg = /^201$/;
      break;
    case 'HR':
      reg = /^1/i;
      break;
    case 'LEADER_REVIEW':
      reg = /^2/i;
      break;
    case 'HR_CONTACT':
        reg = /^3/i;
        break;
    case 'LEADER_INTERVIEW':
      reg = /^4/i;
      break;
    case 'CTO':
        reg = /^5/i;
        break;
    case 'OFFER':
      reg = /^6/i;
      break;
    case 'ONBOARD':
        reg = /^9/i;
        break;
    default:
      reg = /^0/i;
      break;
  }
  const result = listStatus.filter(item => reg.test(item.status));
  return result;
}

export function mapPropertiesInterview(STATIC_LIST, TEAM_COLOR, list){
  const rs = [],
    arrayTeam = getArrayFromObjectList(STATIC_LIST);
  if(list) {
    list.map(item => {
      const interview = {};
      interview.title = arrayTeam[item.team].text.replace(/team/ig, '');
      interview.start = item.dateTimeInterview;
      interview.id = item._id;
      interview.backgroundColor = TEAM_COLOR[item.team]
      rs.push(interview);
    })
  }
  return rs;
}

export function addInBusyDateToInterviewList(interviewList, busyList){
  let newInterviewList = interviewList;
  const rs = [];
  busyList.map(item => {
    const interview = {};
    interview.title = item.team.replace(/_team/ig,'').toUpperCase();
    interview.start = item.dateBusy;
    interview.id = item._id;
    interview.backgroundColor = '#f00'
    rs.push(interview);
  });
  newInterviewList = [...newInterviewList, ...rs];
  return newInterviewList;
}

export function getArrayFromObjectList(objectList) {
  const rs = [];
  if(objectList) {
    objectList.map(item => {
      rs[item.key] = item;
    })
  }
  return rs;
}

export function parseDateTime(dateTime){
  let date = new Date(dateTime);
  const day = date.getDate(),
        month = date.getMonth(),
        year = date.getFullYear(),
        hours = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds();
  return {day: day, month: month, year: year, hours: hours, minutes: minutes, seconds: seconds};
}

export function buildFormatDate(dateTimeObj) {
  let decimalMin = (dateTimeObj.minutes*1) < 10 ? '0'+ dateTimeObj.minutes : dateTimeObj.minutes;
  return `${dateTimeObj.hours}:${decimalMin} ${dateTimeObj.month + 1}/${dateTimeObj.day}/${dateTimeObj.year}`
}

export function actionOpenCV(fileName) {
  window.open(`${API_URL}/file/read/${fileName}`, '_blank');
}
