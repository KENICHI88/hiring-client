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
// import ScheduleActionBar from '../components/Schedule/ScheduleActionBar';
// import ScheduleCreateModal from '../components/Schedule/ScheduleCreateModal';
// import ScheduleBusyCreateModal from '../components/Schedule/ScheduleBusyCreateModal';
// import ScheduleUpdateInterviewModal from '../components/Schedule/ScheduleUpdateInterviewModal';
// import ScheduleLeaderConfirmInterviewModal from '../components/Schedule/ScheduleLeaderConfirmInterviewModal';
// import ScheduleInterviewDetailModal from '../components/Schedule/ScheduleInterviewDetailModal';
///
// import {getBusyDateByMonth} from '../controllers/scheduleController';
///
import {
      interview_api
  } from '../api/callAPI';
///
// import ScheduleAvailableList from '../components/Schedule/ScheduleAvailableList';
// import ScheduleUnavailableList from '../components/Schedule/ScheduleUnavailableList';
// import {authenticationService} from '../services/authentication.service';

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
  
  const classes = useStyles();
  const today = new Date();
  
  const [activeDate, setActiveDate] = useState(today);
  const previousActiveDate = usePrevious(activeDate);
  
  const [interviewList, setInterviewList] = useState([]);
  const previousInterviewList = usePrevious(interviewList);
  
  const [rawIntervewList, setRawInterviewList] = useState([]);
  
  // const [statusConfirm, setStatusConfirm] = useState(null);
  
  // const [currentBusyDateOfLeader, setCurrentBusyDateOfLeader] = useState([]);
  // const previousBusyDateOfLeader = usePrevious(currentBusyDateOfLeader);
  
  // const [filterTeam, setFilterTeam] = useState('');
  // const [filterStatus, setFilterStatus] = useState('');
  
  
  useEffectAsync( async () => {
    actionGetAllInterview();
  }, [])
  
  const actionGetAllInterview = async () => {
    const result = await interview_api.getListByMonth({activeDate: activeDate});
    const rs = await result.data;
      if(rs && rs.result && rs.result.length) {
        const formattedInterviews = mapPropertiesInterview(rs.result);
        if(formattedInterviews && formattedInterviews.length){
          setRawInterviewList(rs.result);
          setInterviewList(formattedInterviews);
        }else {
          setRawInterviewList([]);
          setInterviewList([]);
        }
      }
    
  }
  
  return (
    <>
      
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={8} >
          <Calendar 
            setActiveMonthYear={(currentDate) => {
              setActiveDate(currentDate);
            }
            }
            events={interviewList}
          />
        </Grid>
      </Grid>
      
    </>
  
  )
}

const SchedulePage = Dashboard(Schedule);
const SchedulePageComponent = (function (props) {
  return (<SchedulePage {...props}/>)
}) ;

export default SchedulePageComponent
