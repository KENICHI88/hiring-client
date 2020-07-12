import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import Dashboard from '../containers/Dashboard';

//////
import userController from '../controllers/userController';
import roleController from '../controllers/roleController';
import teamController from '../controllers/teamController';
//////
import {useEffectAsync} from '../utils/utils';
import {Switch,
  Route,
  useRouteMatch} from 'react-router-dom';

// import UserProfileForm from '../components/User/UserProfileForm';
// import UserDetail from '../components/User/UserDetail';
// import UserListTable from '../components/User/UserListTable';
// import UserUpdateModal from '../components/User/UserUpdateModal';

import UserList from '../components/User/List/UserList';
import UserDetail from '../components/User/Detail/UserDetail';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  textField: {
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
    width: 400,
  },
  button: {
    margin: theme.spacing(1),
  },
}));


const UserView = (props) => {
  
  const classes = useStyles();
  let { path } = useRouteMatch();
  
  const [listUser, setListUser] = useState([]);
  const [listTeam, setListTeam] = useState([]);
  const [listRole, setListRole] = useState([]);

  const actionGetListUser = () => {
    userController.getList(null, (data) => {
      setListUser(data.result);
    })
  } 
  
  const actionGetListTeam = () => {
    teamController.getList(null, (data) => {
      setListTeam(data.result);
    })
  }
  
  const actionGetListRole = () => {
    roleController.getList(null, (data) => {
      setListRole(data.result);
    })
  }
  
  useEffectAsync( async () => {
    await actionGetListUser();
    await actionGetListTeam();
    await actionGetListRole();
  }, []);
  

  return (
    <div className={classes.root}>
        
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <Switch>
            <Route exact path={`${path}/`}>
              <UserList
                dataList={listUser}
              />
            </Route>
            <Route path={[`${path}/detail/:idDetail`, `${path}/detail/new`]}>
              <UserDetail
                actionGetList={actionGetListUser}
                listRole={listRole}
                listTeam={listTeam}
              />
            </Route>
            
          </Switch>
        </Grid>
      </Grid>
    </div>
  );
}

const UserPage =  Dashboard(UserView);

export default UserPage;
