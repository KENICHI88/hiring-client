import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Dashboard from '../containers/Dashboard';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
//////
import {GlobalDataContext} from '../context/GlobalData';
//////
//////
import {api_GetAllUser, api_GetAllRole, api_SaveUser} from '../api/callAPI';
//////
import {useEffectAsync} from '../utils/utils';

import UserProfileForm from '../components/User/UserProfileForm';
import UserDetail from '../components/User/UserDetail';
import UserListTable from '../components/User/UserListTable';
import UserUpdateModal from '../components/User/UserUpdateModal';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    'aria-controls': `wrapped-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
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
  const globalContext = React.useContext(GlobalDataContext);
  const {userInfo, act_SetUserInfo, act_getAllLeader, listUser : userList} = globalContext;
  
  const classes = useStyles();
  const [activeTab, setValue] = useState('list');
  
  // const [userList, getAllUser] = useState([]);
  const [roleList, getAllRole] = useState([]);
  
  const [userModalInfo, setUserModalInfo] = useState(null);
  
  const [statusUserModal, setStatusUserModal] = useState(false);
  
  const [searchKey, setSearchKey] = useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const callGetAllUser = function() {
    act_getAllLeader();
  } 

  const callGetAllRole = function() {
    const  result = api_GetAllRole();
    result.then(data => {
      getAllRole(data.data);
    })
  } 
  
  useEffectAsync( async () => {
    
    callGetAllRole();
    
  }, []);
  
  const actionSaveMember = async (values, resetFunc) => {
    
    const result = api_SaveUser(values);
    result.then(data => {
      if(data.statusText === 'OK') {
        resetFunc();
        callGetAllUser();
        setValue('list');
      }
    }).catch(err => {
      console.log(err);
    })
  }
  
  const handleSearchChange = event => {
    setSearchKey(event.target.value);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={activeTab} onChange={handleChange} aria-label="wrapped label tabs example">
          <Tab
            value="list"
            label="List users"
            wrapped
            {...a11yProps('list')}
          />
          {(userInfo && (userInfo.team == 'hr_team' || userInfo.team == 'admin_team' )) ? (
            <Tab 
              value="create"
              label="Create new user"
              {...a11yProps('create')}
            />
          ) : null }
          <Tab
            value="profile"
            label="Update profile"
            wrapped
            {...a11yProps('profile')}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={activeTab} index="list">
        
        <TextField
          id="searchKey"
          label="Search field"
          type="search"
          value={searchKey}
          onChange={handleSearchChange}
          className={classes.textField}
          margin="none"
          variant="outlined"
        />
        <Button variant="contained" color="primary" className={classes.button}>
          Search
        </Button>
        
        
        <UserListTable userList={userList} setStatusUserModal={(statusModal, userId) => {
          setStatusUserModal(statusModal);
          if(userList.length) {
            let userInfo = userList.filter(item => item._id === userId);
            userInfo = userInfo ? userInfo[0] : null;
            setUserModalInfo(userInfo);
          }
        }} />
        
        <UserUpdateModal  isOpen={statusUserModal} userInfo={userModalInfo} setStatusUserModal={(statusModal) => 
          setStatusUserModal(statusModal)
          } />
      </TabPanel>
      <TabPanel value={activeTab} index="create">
        <UserDetail 
          roleList={roleList} 
          actionSaveMember={actionSaveMember}
        />
      </TabPanel>
      <TabPanel value={activeTab} index="profile">
        <UserProfileForm 
          roleList={roleList} 
          actionSaveMember={actionSaveMember}
          userInfo={userInfo}
        />
      </TabPanel>
    </div>
  );
}

const UserPage =  Dashboard(UserView);

export default UserPage;
