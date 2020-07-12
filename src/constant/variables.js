// export const API_URL = 'http://192.168.1.12:8010';
export const API_URL = 'http://192.168.1.120:8010';
// export const API_URL = 'http://172.16.0.228:8010';

export const MAIN_COLOR = '#09d3ac';
export const TEAM_COLOR = {
  'admin_team' : '#000',
  'fe_team' : '#60ad5e',
  'dotnet_team' : '#6c6f00',
  'php_team' : '#003d33',
  'java_team' : '#a0a0a0',
  'qa_team' : '#004c8c',
  'it_team' : '#260e04',
  'hr_team' : '#1c313a',
}

export const LEVEL_COLOR = [
  {key: 'intership_position', val: 'intership_position',    text: '#fcf5b0'},
  {key: 'junior_position',    val: 'junior_position',       text: '#f09595'},
  {key: 'middle_position',    val: 'middle_position',       text: '#9dd8c8'},
  {key: 'senior_position',    val: 'senior_position',       text: '#36b5b0'},
  {key: 'lead_position',      val: 'lead_position',         text: '#151965'},
]

export const TEAM_LIST = [
  {key : 'admin_team',    val: 'admin_team',       text : 'ADMIN', color: '#00aa00'},
  {key : 'fe_team',    val: 'fe_team',       text : 'FE team', color: '#00aa00'},
  {key : 'dotnet_team', val: 'dotnet_team',   text : 'Dot Net team', color: '#00aa00'},
  {key : 'php_team',    val: 'php_team',      text : 'PHP team', color: '#00aa00'},
  {key : 'java_team',   val: 'java_team',     text : 'Java team', color: '#00aa00'},
  {key : 'qa_team',     val: 'qa_team',       text : 'QA team', color: '#00aa00'},
  {key : 'it_team',     val: 'it_team',       text : 'IT team', color: '#00aa00'},
  {key : 'hr_team',     val: 'hr_team',       text : 'HR team', color: '#00aa00'},
];

export const POSITION_LIST = [
  {key: 'intership_position', val: 'intership_position',    text: 'Intership'},
  {key: 'junior_position',    val: 'junior_position',       text: 'Junior'},
  {key: 'middle_position',    val: 'middle_position',       text: 'Middle'},
  {key: 'senior_position',    val: 'senior_position',       text: 'Senior'},
  {key: 'lead_position',      val: 'lead_position',         text: 'Leader'},
]

export const CANDIDATE_STATUS = [
  {key: '001'      , val: 'created'     , text: 'Just created'},
  {key: '100'      , val: 'hr_identified'     , text: 'HR identified'},
  {key: '101'      , val: 'hr_identified_and_ignore'     , text: 'HR identified and ignore'},
  
  {key: '200'      , val: 'leader_check_cv_phase'     , text: 'Leader checks CV phase'},
  {key: '201'      , val: 'leader_check_cv_accept'     , text: 'Leader checked CV and accept'},
  {key: '202'      , val: 'leader_check_cv_ignore'     , text: 'Leader checked CV and ignore'},
  
  {key: '300'      , val: 'hr_contact_phase'     , text: 'HR contacts candidate phase'},
  {key: '310'      , val: 'hr_contacted'     , text: 'HR contacted candidate'},
  {key: '311'      , val: 'hr_contacted_success'     , text: 'HR contacted and success'},
  {key: '312'      , val: 'hr_contacted_fail'     , text: 'HR contacted and fail'},
  
  {key: '400'      , val: 'leader_interview_phase'     , text: 'Leader interview phase'},
  {key: '410'      , val: 'leader_interviewed'     , text: 'Leader interviewed'},
  {key: '411'      , val: 'leader_interviewed_success'     , text: 'Leader interviewed and success'},
  {key: '412'      , val: 'leader_interviewed_fail'     , text: 'Leader interviewed and fail'},
  
  {key: '500'      , val: 'cto_decide_phase'     , text: 'CTO make decision phase'},
  {key: '501'      , val: 'cto_decided_accept'     , text: 'CTO made decision and accepted'},
  {key: '502'      , val: 'cto_decided_ignore'     , text: 'CTO made decision and ignore'},
  
  {key: '600'      , val: 'offer_phase'     , text: 'OFFER phase'},
  {key: '601'      , val: 'offer_sent_success'     , text: 'OFFER sent and accepted'},
  {key: '602'      , val: 'offer_sent_cancel'     , text: 'OFFER sent and cancel'},
  
  {key: '900'      , val: 'onboard_phase'     , text: 'ONBOARD phase'},
  {key: '901'      , val: 'onboard_waiting'     , text: 'Candidate waits to work'},
  {key: '902'      , val: 'onboard_success'     , text: 'Candidate was onboard'},
]

export const STATUS_PAIR = {
  '001' : ['100', '101'],
  '100' : ['200'],
  '200' : ['201', '202'],
  '201' : ['300'],
  '300' : ['310'],
  '310' : ['311', '312'],
  '311' : ['400'],
  '400' : ['410'],
  '410' : ['411', '412'],
  '411' : ['500'],
  '500' : ['501', '502'],
  '501' : ['600'],
  '600' : ['601', '602'],
  '601' : ['900'],
  '900' : ['901', '902'],
}
export const STATUS_PAIR_MESSAGE = {
  '001' : 'Next phase: HR identify',
  '100' : 'Next phase: Leader verify CV',
  '101' : 'HR identified and ignore',
  '200' : 'Next step: wait Leader confirm CV',
  '201' : 'Next phase: HR contact candidate',
  '300' : 'Next step:  wait HR contact result',
  '310' : 'Next phase: HR contact result',
  '311' : 'Next phase: Leader interview',
  '400' : 'Next step: wait Leader interview result',
  '410' : 'Next phase: Leader interview result',
  '411' : 'Next phase: CTO decision',
  '500' : 'Next step: wait CTO decision result',
  '501' : 'Next phase: OFFER phase',
  '600' : 'Next step: wait OFFER result',
  '601' : 'Next phase: ONBOARD phase',
  '900' : 'Next phase: go onboard',
}

///////////////

// 001 - Create candidate (candidate) => next 100
// 100 - HR identify phase (candidate) => next 200
// 101 - HR identify and ignore (candidate) => stop here

// 200 - Leader checks CV phase (candidate) => next 201, 202
// 201 ---- Leader accept CV (candidate) => next 300
// 202 ---- Leader ignore CV (candidate) => stop here

// 300 - HR contact candidate phase (candidate) => next 310
// 310 - HR contacted candidate (candidate) => next 311, 312
// 311 ---- HR contact and success (candidate) => next 400
// 312 ---- HR contact and fail (candidate) => stop here

// 400 - Leader interview phase phase (interview) => next 410
// 410 - Leader interviewed (candidate) => next 411, 412
// 411 ---- Leader interviewed and success (interview) => next 500
// 412 ---- Leader interviewed and fail (interview) => stop here

// 500 - CTO decision phase (candidate) => next 501, 502
// 501 ---- CTO accept candidate (candidate) => next 600
// 502 ---- CTO ignore candidate (candidate) => stop here

// 600 - OFFER phase (candidate) => next 601, 602
// 601 ---- OFFER sent and success (candidate) => next 900
// 602 ---- OFFET sent and fail (candidate) => stop here

// 900 - ONBOARD phase (candidate) => next 901, 902
// 901 ---- Candidate wait to be onboard (candidate) => stop here
// 902 ---- Candidate is onboard (candidate) => stop here

////////////////////
// export const CANDIDATE_STATUS = [
//   {key: '001', val: 'created', text : 'Just create'},
  
//   {key: '100', val: 'hr_indentified', text : 'HR indentified'},
//   {key: '101', val: 'hr_contacted', text : 'HR contacted'},
//   {key: '101_1', val: 'hr_contacted_accepted', text : 'HR contacted and accepted'},
//   {key: '101_2', val: 'hr_contacted_ignore', text : 'HR contacted but ignore'},
//   {key: '103', val: 'hr_interviewed_phone', text : 'HR interview via phone'},
  
//   {key: '200', val: 'leader_pending', text : 'Waiting Leader check'},
//   {key: '201', val: 'leader_accepted_cv', text : 'Leader accepted CV'},
//   {key: '202', val: 'leader_ignore_cv', text : 'Leader ignore CV'},
  
//   {key: '300', val: 'candidate_pending_interview', text : 'Waiting candidate confirm'},
//   {key: '301', val: 'candidate_accepted_interview', text : 'Candidate accepted interview'},
//   {key: '301_1', val: 'candidate_accepted_interview_dont_come', text : 'Candidate accepted the interview but didn`t come'},
//   {key: '303', val: 'candidate_ignore_interview', text : 'Candidate ignore the interview'},
  
//   {key: '400', val: 'interview_pending', text : 'Interview is pending'},
//   {key: '401', val: 'interview_done', text : 'Interview finished'},
//   {key: '401_1', val: 'interview_done_leader_accept', text : 'Interview done and Leader accept'},
//   {key: '401_2', val: 'interview_done_leader_ignore', text : 'Interview done and Leader ignore'},
  
//   {key: '500', val: 'cto_pending', text : 'Waiting CTO approve/ignore'},
//   {key: '501', val: 'cto_approve', text : 'CTO approved'},
//   {key: '502', val: 'cto_ignore', text : 'CTO ignored'},
  
//   {key: '600', val: 'offer_sent_pending', text : 'Waiting to send OFFER'},
//   {key: '601', val: 'offer_sent_accepted', text : 'OFFER sent and accepted'},
//   {key: '602', val: 'offer_sent_ignored', text : 'OFFER sent and ignored'},

//   {key: '900', val: 'candidate_wait_onboard', text : 'Candidate waits to be onboard'},
//   {key: '901', val: 'candidate_is_onboard', text : 'Candidate is onboard'},
// ]
////////////////////
