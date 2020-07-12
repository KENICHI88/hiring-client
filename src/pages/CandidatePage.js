import React, { useState, useEffect } from 'react'
import Dashboard from '../containers/Dashboard';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Grid from '@material-ui/core/Grid';

import { green } from '@material-ui/core/colors';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';


import {api_GetAllCandidate, api_CreateCandidate, api_UpdateCandidate} from '../api/callAPI';
//////
import {GlobalDataContext} from '../context/GlobalData';
//////
import {useEffectAsync} from '../utils/utils';
import CandidateDetailForm from '../components/Candidate/CandidateDetailForm';
import CandidateList from '../components/Candidate/CandidateList';
import CandidateDetailInfor from '../components/Candidate/CandidateDetailInfor';
import CandidateStatusFormModal from '../components/Candidate/CandidateUpdateStatusForm'
import CandidateLeaderConfirmCVModal from '../components/Candidate/CandidateLeaderConfirmModal';


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
  success: {
    backgroundColor: green[600],
  },
}));

const Candidate = function(props) {
  
  const globalContext = React.useContext(GlobalDataContext);
  
  const {act_GetAllCandidate, listCandidate, userInfo, act_SetUserInfo} = globalContext;
  const classes = useStyles();
  
  const [activeTab, setActiveTab] = useState('list');
  
  const [selectedCandidate, selectCandidate] = useState({});
  const [isSelecting, updateStatusSelecting] = useState(false);
  const [messageStatus, setMessageStatus] = useState('');
  const [isMessageOpen, setMessageOpen] = useState(false);
  
  const [isCandidateStatusFormOpen, setCandidateStatusForm] = useState(false);
  const [isLeaderConfirmCVFormOpen, setStatusFormLeaderConfirmCV] = useState(false);
  const [isConfirmNextPhaseFormOpen, setStatusConfirmNextPhaseForm] = useState(false);
  
  const [isEdit, setEditStatus] = useState(false);
  
  useEffectAsync( async () => {
    actionGetAllCandidate();
  }, []);
  
  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  const actionUpdateStatusCandidate = (data) => {
    const dataForm = {'id' : selectedCandidate._id ,...data};
    api_UpdateCandidate(dataForm)
      .then(data => {
        if(data && data.data) {
          actionGetAllCandidate();
          selectCandidate({});
          updateStatusSelecting(false);
          setEditStatus(false);
          setCandidateStatusForm(false);
        }
      })
      .catch(err => {
        console.log(err);
        selectCandidate({});
      });
  }
  
  const actionUpdateStatusLeaderConfirm = (data) => {
    let dataForm = {'id' : selectedCandidate._id};
    if(data===true){
      dataForm = {...dataForm, status : 201};
    }else {
      dataForm = {...dataForm, status : 202};
    }
    api_UpdateCandidate(dataForm)
      .then(data => {
        if(data && data.data) {
          actionGetAllCandidate();
          selectCandidate({});
          setStatusFormLeaderConfirmCV(false);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  
  
  const actionGetAllCandidate = async () => {
    act_GetAllCandidate();
  }
  
  const actionSetStatusEditPanel = (status) => {
    setEditStatus(status);
  }
  
  const actionSelectCandidate = (idKey) => {
    if(idKey===null){
      updateStatusSelecting(false);
      setEditStatus(false);
      selectCandidate({});
      setStatusConfirmNextPhaseForm(false);
      return false;
    }
    const selectedCandidate = listCandidate.filter(item => {
      return item._id === idKey;
    })
    if(selectedCandidate) {
      setEditStatus(false);
      selectCandidate(selectedCandidate[0]);
      updateStatusSelecting(true);
    }
  }
  
  const actionEditCandidate = (idKey) => {
    const selectedCandidate = listCandidate.filter(item => {
      return item._id === idKey;
    })
    updateStatusSelecting(false);
    setEditStatus(true);
    setStatusConfirmNextPhaseForm(false);
    selectCandidate(selectedCandidate[0]);
  }
  
  const actionSelectCandidateToNextPhase = (idKey) => {
    const selectedCandidate = listCandidate.filter(item => {
      return item._id === idKey;
    })
    updateStatusSelecting(false);
    setEditStatus(false);
    setStatusConfirmNextPhaseForm(true);
    selectCandidate(selectedCandidate[0]);
  }
  
  const actionSaveCandidate = async (values, resetFunc) => {
    let formData = new FormData(values.target);
    
    
    if(values) {
      Object.keys(values).map(key => {
        if(key == '_id' && values[key] == undefined){
          
        }else {
          if(key!='cv_file') {
            formData.append(`${key}`, `${values[key]}`);
          }
        }
        
      });
      formData.append('cv_file', values.cv_file);
      
    }
    let apiSaveCandidate = null;
    
    if(values._id !== '') {
      apiSaveCandidate = api_UpdateCandidate(formData);
    }else {
      apiSaveCandidate = api_CreateCandidate(formData);
    }
    
    apiSaveCandidate.then(data => {
      if(data.statusText === 'OK') {
        resetFunc();
        setMessageStatus('Candidate was created successfully');
        setMessageOpen(true);
        actionGetAllCandidate();
        setActiveTab('list');
        setEditStatus(false);
        updateStatusSelecting(false);
        selectCandidate({});
      }else if(data.status === 500) {
        setMessageOpen(true);
        updateStatusSelecting(false);
      }
    })
    .catch(error => {
      setMessageStatus(error.message);
      setMessageOpen(true);
    })
  }
  
  return (
    <GlobalDataContext.Consumer>
      {(context) => {
        return (
          <div className={classes.root}>
            <AppBar position="static">
              <Tabs value={activeTab} onChange={handleChange} aria-label="wrapped label tabs example">
                
                <Tab
                  value="list"
                  label="List candidates"
                  wrapped
                  {...a11yProps('list')}
                />
                {(userInfo && (userInfo.team == 'hr_team' || userInfo.team == 'admin_team' )) ? (
                  <Tab 
                  value="create"
                  label="Create new candidate"
                  {...a11yProps('create')}
                />
                ) : null}
                
              </Tabs>
            </AppBar>
            
            <TabPanel value={activeTab} index="list">
              <Grid container spacing={3}>
                <Grid item xs={(isSelecting || isEdit) ? 8: 12}>
                  <CandidateList 
                      candidateList={listCandidate} 
                      actionSelectCandidate={actionSelectCandidate}
                      actionEditCandidate={actionEditCandidate}
                      actionSelectCandidateToNextPhase={actionSelectCandidateToNextPhase}
                      userInfo={userInfo}
                  />
                </Grid>
                <Grid display={(isSelecting || isEdit) ? "block" : "none"} item xs={4}>
                  <CandidateDetailInfor 
                    isSelecting={isSelecting} 
                    infor={selectedCandidate}
                    setCandidateStatusForm={(status) => setCandidateStatusForm(status)}
                    setConfirmCandidate={(status)=>setStatusFormLeaderConfirmCV(status)}
                    userInfo={userInfo}
                    actionSelectCandidate={actionSelectCandidate}
                  />
                  {isEdit && selectedCandidate ? (<CandidateDetailForm
                    isEdit={true}
                    selectedCandidate={selectedCandidate}
                    saveCandidate={actionSaveCandidate}
                    setCandidateStatusForm={(status)=> setCandidateStatusForm(status)}
                    actionSetStatusEditPanel={actionSetStatusEditPanel}
                    userInfo={userInfo}
                  />) : null}
                  
                </Grid>
              </Grid>
            </TabPanel>
            
            <TabPanel value={activeTab} index="create">
              <CandidateDetailForm 
                isEdit={false}
                saveCandidate={actionSaveCandidate} 
                setCandidateStatusForm={(status)=> setCandidateStatusForm(status)} 
                userInfo={userInfo}
              />
            </TabPanel>
            
            <CandidateLeaderConfirmCVModal
              isOpen={isLeaderConfirmCVFormOpen}
              setConfirmCandidate={(status)=>setStatusFormLeaderConfirmCV(status)}
              updateStatusLeaderConfirm={actionUpdateStatusLeaderConfirm}
            />
            
            <CandidateStatusFormModal 
              isOpen={isCandidateStatusFormOpen}
              setCandidateStatusForm={(status) => setCandidateStatusForm(status)}
              updateStatusCandidate={actionUpdateStatusCandidate}
              candidateInfo={selectedCandidate}
            />
            
            <Snackbar
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              open={isMessageOpen}
              autoHideDuration={6000}
              onClose={() => {
                setMessageStatus(false);
              }}
            >
              <SnackbarContent
                aria-describedby="client-snackbar"
                className={classes.success}
                message={
                  <span id="client-snackbar" className="">{messageStatus}</span>
                }
              />
            </Snackbar>
            
          </div>
        )
      }}
      
    </GlobalDataContext.Consumer>
  )
}

const CandidatePage = Dashboard(Candidate);
export default CandidatePage;
