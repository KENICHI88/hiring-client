import React, { useState } from 'react'
import Dashboard from '../containers/Dashboard';

import {useEffectAsync} from '../utils/utils';

import Grid from '@material-ui/core/Grid';

import {Switch,
  Route,
  useRouteMatch} from 'react-router-dom';


import roleController from '../controllers/roleController';

import RoleDetail from '../components/Role/Detail/RoleDetail';
import RoleList from '../components/Role/List/RoleList';

const RolePageWrapper = (props) => {
  let { path } = useRouteMatch();
  
  const [listRole, setListRole] = useState([]);
  
  useEffectAsync(() => {
    actionGetList();
    
  }, []);
  
  const actionGetList = () => {
    roleController.getList(null, (data) => {
      setListRole(data.result);
    });
  }
  
  return (
    <>
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <Switch>
            <Route exact path={`${path}/`}>
              <RoleList
                dataList={listRole}
              />
            </Route>
            <Route path={[`${path}/detail/:idDetail`, `${path}/detail/new`]}>
              <RoleDetail
                actionGetList={actionGetList}
              />
            </Route>
            
          </Switch>
        </Grid>
      </Grid>
    </>
  )
}

const RolePage = Dashboard(RolePageWrapper);

export default RolePage;
