import React, { useState } from 'react'
import Dashboard from '../containers/Dashboard';

import {useEffectAsync} from '../utils/utils';

import Grid from '@material-ui/core/Grid';

import {Switch,
  Route,
  useRouteMatch} from 'react-router-dom';


import permissionController from '../controllers/permissionController';

import PermissionDetail from '../components/Permission/Detail/PermissionDetail';
import PermissionList from '../components/Permission/List/PermissionList';

const PermissionPageWrapper = (props) => {
  let { path } = useRouteMatch();
  
  const [listPermission, setListPermission] = useState([]);
  
  useEffectAsync(() => {
    actionGetList();
    
  }, []);
  
  const actionGetList = () => {
    permissionController.getList(null, (data) => {
      setListPermission(data.result);
    });
  }
  
  return (
    <>
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <Switch>
            <Route exact path={`${path}/`}>
              <PermissionList
                dataList={listPermission}
              />
            </Route>
            <Route exact path={[`${path}/detail/:idDetail`, `${path}/detail/new`]}>
              <PermissionDetail
                actionGetList={actionGetList}
              />
            </Route>
          </Switch>
        </Grid>
      </Grid>
    </>
  )
}

const PermissionPage = Dashboard(PermissionPageWrapper);

export default PermissionPage;
