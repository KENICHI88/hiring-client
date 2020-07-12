import React, { useState } from 'react'
import Dashboard from '../containers/Dashboard';

import {useEffectAsync} from '../utils/utils';

import Grid from '@material-ui/core/Grid';

import {Switch,
  Route,
  useRouteMatch} from 'react-router-dom';

import fileController from '../controllers/fileController';

import FileList from '../components/File/List/FileList';
import FileDetail from '../components/File/Detail/FileDetail';

const FilePageWrapper = (props) => {
  let { path } = useRouteMatch();
  
  const [listFile, setListFile] = useState([]);
  
  useEffectAsync(() => {
    actionGetList()
    
  }, []);
  
  const actionGetList = () => {
    fileController.getList(null, (data) => {
      setListFile(data.result);
    });
  }
  
  return (
    <>
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <Switch>
            <Route exact path={`${path}/`}>
              <FileList
                dataList={listFile}
              />
            </Route>
            <Route path={[`${path}/detail/:idDetail`, `${path}/detail/new`]}>
              <FileDetail
                actionGetList={actionGetList}
              />
            </Route>
          </Switch>
        </Grid>
      </Grid>
    </>
  )
}
const TeamPage = Dashboard(FilePageWrapper);

export default TeamPage;
