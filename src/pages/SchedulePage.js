import React, { useState, useEffect, useRef} from 'react';
import {isEqual} from 'lodash';
import { makeStyles } from '@material-ui/core/styles'
import Calendar from '../components/Schedule/Calendar'
import Dashboard from '../containers/Dashboard'

import {TEAM_LIST, TEAM_COLOR} from '../constant/variables'
//////
import {GlobalDataContext} from '../context/GlobalData';
//////
import Grid from '@material-ui/core/Grid'

///
import ScheduleActionBar from '../components/Schedule/ScheduleActionBar';
import ScheduleCreateModal from '../components/Schedule/ScheduleCreateModal';
import ScheduleBusyCreateModal from '../components/Schedule/ScheduleBusyCreateModal';
import ScheduleUpdateInterviewModal from '../components/Schedule/ScheduleUpdateInterviewModal';
import ScheduleLeaderConfirmInterviewModal from '../components/Schedule/ScheduleLeaderConfirmInterviewModal';
import ScheduleInterviewDetailModal from '../components/Schedule/ScheduleInterviewDetailModal';
///
import {getBusyDateByMonth} from '../controllers/scheduleController';
///
import {
        api_CreateBusyDateTime,
        api_CreateInterview,
        api_GetAllInterview,
        api_UpdateCandidate,
        api_UpdateInterview,
    } from '../api/callAPI';
///
import ScheduleAvailableList from '../components/Schedule/ScheduleAvailableList';
import ScheduleUnavailableList from '../components/Schedule/ScheduleUnavailableList';
import {authenticationService} from '../services/authentication.service';

import {mapPropertiesInterview, useEffectAsync, parseDateTime, addInBusyDateToInterviewList} from '../utils/utils';

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  margin: {
    margin: theme.spacing(1),
  },
  containerUnvailableList: {
    maxWidth: '280px',
  }
}));

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const Schedule = function (props) {
  const globalContext = React.useContext(GlobalDataContext);
  const {
      act_GetAllCandidate,
      listCandidate,
      userInfo,
      listUser : listLeader,
      act_getAllLeader
    } = globalContext;
  const classes = useStyles();
  const today = new Date();
  
  const [isScheduleModalOpen, setStatusScheduleModal] = useState(false);
  const [isScheduleBusyModalOpen, setStatusScheduleBusyModal] = useState(false);
  const [isScheduleInterviewUpdateModalOpen, setStatusScheduleUpdateModal] = useState(false);
  const [isLeaderConfirmModalOpen, setStatusLeaderConfirmModal] = useState(false);
  const [isInterviewDetailModalOpen, setStatusModalInterviewDetail] = useState(false);
  
  const [interviewConfirmInfo, setSelectedInterview] = useState({});
  
  const [activeDate, setActiveDate] = useState(today);
  const previousActiveDate = usePrevious(activeDate);
  
  const [interviewList, setInterviewList] = useState([]);
  const previousInterviewList = usePrevious(interviewList);
  
  const [rawIntervewList, setRawInterviewList] = useState([]);
  
  const [busyDateList, setBusyDateList] = useState([]);
  const previousBusyDateList = usePrevious(busyDateList);
  
  const [statusConfirm, setStatusConfirm] = useState(null);
  
  const [currentBusyDateOfLeader, setCurrentBusyDateOfLeader] = useState([]);
  const previousBusyDateOfLeader = usePrevious(currentBusyDateOfLeader);
  
  const [filterTeam, setFilterTeam] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  
  const actionGetAllCandidate = async () => {
    act_GetAllCandidate();
  }
  const actionGetAllLeader = async () => {
    act_getAllLeader()
  }
  
  const actionGetAllBusyDateByMonth = () => {
    getBusyDateByMonth(activeDate, (dataRespond) => {
      setBusyDateList(dataRespond.data);
    }, (error) => {
      console.log(error);
    })
  }
  
  const actionAssignBusyDate = async () => {
    try{
      const rs = await function(){
        let arr = [];
        if(userInfo.team ==='admin_team' || userInfo.team === 'hr_team'){
          if(busyDateList && busyDateList.length) {
            busyDateList.map(item => {
              const info = item;
              info.team = item.userId.team;
              info.username = item.userId.username;
              arr.push(info);
            });
          }
        }else {
          if(busyDateList && busyDateList.length) {
            busyDateList.map(item => {
              if(item.userId._id === userInfo._id) {
                const info = item;
                info.team = item.userId.team;
                info.username = item.userId.username;
                arr.push(info);
              }
            });
          }
        }
        return arr;
      }
      if(rs){
        setCurrentBusyDateOfLeader(rs);
      }
    }catch(err){
      console.log(err);
    }
    
  }
  
  const adjustListEvent = () => {
    const newArr = addInBusyDateToInterviewList(interviewList, currentBusyDateOfLeader);
    return newArr;
  }
  
  
  useEffectAsync( async () => {
    act_GetAllCandidate({status: '201'});
      if(typeof previousActiveDate !== 'undefined' && activeDate !== previousActiveDate){
        await actionGetAllLeader();
        await actionGetAllBusyDateByMonth();
        await actionGetAllInterview();
      }
      
      if(typeof previousInterviewList !== 'undefined' &&  !isEqual(previousInterviewList, interviewList)){
        actionGetAllInterview();
      }
      
      if(typeof previousBusyDateList !=='undefined' &&  !isEqual(previousBusyDateList, busyDateList)) {
        actionAssignBusyDate();
      }
    ;
    
  }, [activeDate, busyDateList, currentBusyDateOfLeader])
  
  const actionGetAllInterview = async () => {
    try {
      const result = await api_GetAllInterview({activeDate: activeDate});
      const rs = result.data;
      if(rs) {
        const formattedInterviews = mapPropertiesInterview(TEAM_LIST, TEAM_COLOR, rs);
        if(formattedInterviews && formattedInterviews.length){
          setRawInterviewList(rs);
          setInterviewList(formattedInterviews);
        }else {
          setRawInterviewList([]);
          setInterviewList([]);
        }
      }
    }catch(err){
      setRawInterviewList([]);
    }
    
  }
  
  const actionSetStatusScheduleModal = (isOpen) => {
    setStatusScheduleModal(isOpen);
  }
  const actionSetStatusScheduleBusyModal = (isOpen) => {
    setStatusScheduleBusyModal(isOpen);
  }
  const actionSetStatusModalLeaderConfirm = (isOpen) => {
    setStatusLeaderConfirmModal(isOpen);
  }
  
  const actionSetStatusLeaderConfirmModal = (confirmResult) => {
    if(interviewConfirmInfo && interviewConfirmInfo._id && interviewConfirmInfo.candidateId ) {
      const rs = api_UpdateInterview({_id: interviewConfirmInfo._id, status : confirmResult.status, comment: confirmResult.comment});
      rs.then(result => {
        if(result.data.result ==='OK'){
          api_UpdateCandidate({_id: interviewConfirmInfo.candidateId, status : confirmResult.status})
            .then(result => {
              if(result.data.result === 'OK'){
                setStatusLeaderConfirmModal(false);
                setStatusConfirm(null);
                setSelectedInterview({});
                actionGetAllInterview();
                setStatusModalInterviewDetail(false);
              }
            })
        }
      }).catch(error => {
        setStatusLeaderConfirmModal(false);
      })
    }
  }
  
  
  const actionSaveScheduleBusy = (data) => {
    let localData = localStorage.getItem('userInfor');
    localData = localData ? JSON.parse(localData) : null;
    if(localData){
      data.userId = localData._id;
      api_CreateBusyDateTime(data)
        .then(data => {
          if(data.data && data.data.result==='OK'){
            setStatusScheduleBusyModal(false);
            actionGetAllLeader();
          }
        })
        .catch(err => {
          console.log(err);
        });
    }else {
      props.history.push('/login');
    }
  }
  
  const actionConfirmCV = (interviewInfo, statusConfirm) => {
    setSelectedInterview(interviewInfo);
    setStatusConfirm(statusConfirm);
  }
  
  const actionCallModalConfirm = (interviewInfo) => {
    // setSelectedInterview(interviewInfo);
    setStatusModalInterviewDetail(false);
    setStatusLeaderConfirmModal(true);
  }
  
  const actionSelectInterview = (infoInterview) => {
    setSelectedInterview(infoInterview); // set single selected interview
    setStatusModalInterviewDetail(true); // set status of modal InterviewDetail to open
    
  }
  
  const actionCreateInterview = (data) => {
    api_CreateInterview(data)
      .then(data => {
        if(data.data) {
          const dataCandidate = {};
          dataCandidate.status = '400';
          dataCandidate.id = data.data.candidateId;
          api_UpdateCandidate(dataCandidate)
          .then(data => {
            if(data.data.result ==='OK') {
              setStatusScheduleModal(false);
              const callRetrieveData = async () => {
                await actionGetAllLeader();
                await actionGetAllInterview();
                await act_GetAllCandidate({status: '201'});
              }
              callRetrieveData();
            }
          });
        }
      })
      .catch(error => {
        console.log(error);
      })
  }
  
  return (
    <>
      <ScheduleActionBar
        setStatusScheduleModal={setStatusScheduleModal}
        setStatusScheduleBusyModal={setStatusScheduleBusyModal}
        authenticationService={authenticationService}
        setFilterTeam={(value) => setFilterTeam(value)}
        setFilterStatus={(value) => setFilterStatus(value)}
      />
      
      
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={5} >
          <Calendar events={adjustListEvent()}
            setStatusScheduleModal={actionSetStatusScheduleModal}
            setActiveMonthYear={(currentDate) => {
              setActiveDate(currentDate);
            }
            }
          />
          
        </Grid>
        <Grid item xs >
          <Grid container spacing={1}>
          {rawIntervewList && rawIntervewList.length ? 
            (<Grid item xs><ScheduleAvailableList 
              rawIntervewList={rawIntervewList}
              actionSelectInterview={actionSelectInterview}
              filterTeam={filterTeam}
              filterStatus={filterStatus}
              userInfo={userInfo}
            /></Grid>) : null}
          { (busyDateList && busyDateList.length) ? <Grid item xs className={classes.containerUnvailableList}><ScheduleUnavailableList 
            rawIntervewList={busyDateList}
            /></Grid>: null}
          </Grid>
        </Grid>
      </Grid>
      
      {/* Modal to create the interview */}
      <ScheduleCreateModal
        isOpen={isScheduleModalOpen}
        setStatusScheduleModal={actionSetStatusScheduleModal}
        events={interviewList}
        busyDateList={busyDateList}
        listCandidate={listCandidate} 
        listLeader={listLeader}
        listTeam={TEAM_LIST}
        actionCreateInterview={actionCreateInterview}
      />
      
      {/* Modal to create a busy time */}
      <ScheduleBusyCreateModal
        isOpen={isScheduleBusyModalOpen}
        setStatusScheduleModal={actionSetStatusScheduleBusyModal}
        listLeader={listLeader}
        actionSaveScheduleBusy={actionSaveScheduleBusy}
      />
      
      {/* Modal to update the status of interview */}
      <ScheduleUpdateInterviewModal 
        isOpen={isScheduleInterviewUpdateModalOpen}
        setStatusScheduleModal={setStatusScheduleUpdateModal}
      />
      
      {/* Modal to Leader confirm the result of the interview */}
      <ScheduleLeaderConfirmInterviewModal 
        interviewConfirmInfo={interviewConfirmInfo}
        isOpen={isLeaderConfirmModalOpen}
        updateStatusLeaderConfirmModal={(status)=> actionSetStatusModalLeaderConfirm(status)}
        updateLeaderConfirmModal={actionSetStatusLeaderConfirmModal}
      />
      
      {/* Modal to view information of interview, candidate */}
      <ScheduleInterviewDetailModal
        isOpen={isInterviewDetailModalOpen}
        setStatusModalInterviewDetail={setStatusModalInterviewDetail}
        infoInterview={interviewConfirmInfo}
        userInfo={userInfo}
        actionCallModalConfirm={actionCallModalConfirm}
      />
    </>
  
  )
}

const SchedulePage = Dashboard(Schedule);
const SchedulePageComponent = (function (props) {
  return (<SchedulePage {...props}/>)
}) ;

export default SchedulePageComponent
