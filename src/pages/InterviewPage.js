import React, { useState } from 'react'
import Dashboard from '../containers/Dashboard';

import {useEffectAsync} from '../utils/utils';

import Grid from '@material-ui/core/Grid';

import {Switch,
  Route,
  useRouteMatch} from 'react-router-dom';

import interviewController from '../controllers/interviewController';
import userController from '../controllers/userController';

import InterviewDetail from '../components/Interview/Detail/InterviewDetail';
import InterviewList from '../components/Interview/List/InterviewList';

const InterviewPageWrapper = (props) => {
  let { path } = useRouteMatch();
  
  const [listInterview, setListInterview] = useState([]);
  const [listMember, setListMember] = useState([]);
  const [listCandidate, setListCandidate] = useState([]);
  
  useEffectAsync(() => {
    getData();
  }, []);
  
  const getData = () => {
    actionGetList();
    actionGetMemberList();
    actionGetCandidateAvailableList();
  }
  
  const actionGetList = () => {
    interviewController.getList(null, (data) => {
      setListInterview(data.result);
    });
  }
  
  const actionGetMemberList = () => {
    userController.getList({type: 'isMember', status: 1}, data => {
      setListMember(data.result);
    })
  }
  // Get candidate with (InterviewStatus = 2 (FAIL interview)) OR (type is 'isCandidate' and there is no InterviewInfo)
  const actionGetCandidateAvailableList = () => {
    userController.getListCandidateAvailable(null, data => {
      setListCandidate(data.result);
    })
  }
  
  return (
    <>
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <Switch>
            <Route exact path={`${path}/`}>
              <InterviewList
                dataList={listInterview}
              />
            </Route>
            <Route path={[`${path}/detail/:idDetail`, `${path}/detail/new`]}>
              <InterviewDetail
                actionGetList={getData}
                listMember={listMember}
                listCandidate={listCandidate}
              />
            </Route>
            
          </Switch>
        </Grid>
      </Grid>
    </>
  )
}


const InterviewPage = Dashboard(InterviewPageWrapper);

export default InterviewPage;
