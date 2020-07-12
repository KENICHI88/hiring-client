import React, { useState } from 'react'
import Dashboard from '../containers/Dashboard';

import {useEffectAsync} from '../utils/utils';

import Grid from '@material-ui/core/Grid';

import {Switch,
  Route,
  useRouteMatch} from 'react-router-dom';


import teamController from '../controllers/teamController';
import userController from '../controllers/userController';

import TeamDetail from '../components/Team/Detail/TeamDetail';
import TeamList from '../components/Team/List/TeamList';

const TeamPageWrapper = (props) => {
  let { path } = useRouteMatch();
  
  const [listTeam, setListTeam] = useState([]);
  const [listMember, setListMember] = useState([]);
  
  useEffectAsync(() => {
    actionGetList()
    
    userController.getList(null, data => {
      setListMember(data.result);
    })
    
  }, []);
  
  const actionGetList = () => {
    teamController.getList(null, (data) => {
      setListTeam(data.result);
    });
  }
  
  return (
    <>
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <Switch>
            <Route exact path={`${path}/`}>
              <TeamList
                dataList={listTeam}
              />
            </Route>
            <Route path={[`${path}/detail/:idDetail/edit`, `${path}/detail/:idDetail/view`, `${path}/detail/new`]}>
              <TeamDetail
                actionGetList={actionGetList}
                listMember={listMember}
              />
            </Route>
            
          </Switch>
        </Grid>
      </Grid>
    </>
  )
}

TeamPageWrapper.propTypes = {

}


const TeamPage = Dashboard(TeamPageWrapper);

export default TeamPage;
