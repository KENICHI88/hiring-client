import React, { useState, useEffect } from 'react'
import Dashboard from '../containers/Dashboard';

import {useEffectAsync} from '../utils/utils';

import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';

import MainCardItem from '../components/Dashboard/MainCardItem'

import dashboardController from '../controllers/dasboardController';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  success: {
    backgroundColor: green[600],
  },
}));

const DashboardWrapper = function(props) {
  
  const [interviewListToday, setInterviewListToday] = useState(0);
  const [interviewListByWeek, setInterviewListByWeek] = useState(0);
  const [interviewListByMonth, setInterviewListByMonth] = useState(0);
  const [userList, setUserList] = useState([]);
  const [userListCount, setUserListCount] = useState(0);
  const [candidateInMonth, setCountCandidateInMonth] = useState(0);
  
  useEffectAsync( async () => {
    const listUser = await dashboardController.getTotalUser();
    const listInterviewToday = await dashboardController.getTotalInterview({byCondition:'day'});
    const listInterviewByWeek = await dashboardController.getTotalInterview({byCondition:'week'});
    const listInterviewByMonth = await dashboardController.getTotalInterview({byCondition:'month'});
    const listCandidateByMonth = await dashboardController.getTotalCandidate({byCondition:'month'});
    
    if(listUser.status === 200) {
      setUserListCount(listUser.data);
    }
    
    if(listInterviewToday.status === 200) {
      setInterviewListToday(listInterviewToday.data);
    }
    if(listInterviewByWeek.status === 200) {
      setInterviewListByWeek(listInterviewByWeek.data);
    }
    
    if(listInterviewByMonth.status === 200) {
      setInterviewListByMonth(listInterviewByMonth.data);
    }
    
    if(listCandidateByMonth.status === 200) {
      setCountCandidateInMonth(listCandidateByMonth.data);
    }
    
  }, []);
  
  
  
  return (
    
    <Grid container spacing={3}>
      <Grid item xs>
        <MainCardItem
          mainTitle="Interviews"
          
          statistic={[{'number': interviewListToday, 'desc': 'Today'},
                      {'number': interviewListByWeek, 'desc': 'This week'},
                      {'number': interviewListByMonth, 'desc': 'This month'},
                  ]}
        />
      </Grid>
      <Grid item xs>
        <MainCardItem
          mainTitle="Users"
          statistic={[{'number': userListCount, 'desc': 'Total'}
                  ]}
        />
      </Grid>
      <Grid item xs>
        <MainCardItem
          mainTitle="Candidate apply in month"
          statistic={[{'number': candidateInMonth, 'desc': 'Total'},
                  ]}
        />
      </Grid>
    </Grid>
  )
}

const DashboardPage = Dashboard(DashboardWrapper);
export default DashboardPage;
