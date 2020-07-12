import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import TextField from '@material-ui/core/TextField';
//////
// import {GlobalDataContext} from '../context/GlobalData';
//////
// import {authenticationService} from '../../services/authentication.service';



const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: '100%',
    width: '100%',
  },
  formWrapper: {
    display: 'inline-flex'
  }
}));

function ScheduleActionBar(props) {
  
  const classes = useStyles();
  const {authenticationService} = props;
  const [filterTeam, setFilterTeam] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  
  
  const handleChangeFilterByTeam = event => {
    setFilterTeam(event.target.value);
    props.setFilterTeam(event.target.value);
  };
  
  const handleChangeFilterByStatus = event => {
    setFilterStatus(event.target.value);
    props.setFilterStatus(event.target.value);
  };
  
  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12} >
        {authenticationService.isAdmin() ? (<Fab
            variant="extended"
            size="small" 
            color="primary"
            aria-label="add"
            className={classes.margin}
            onClick={() => {
            props.setStatusScheduleModal(true);
          }}>
          <AddIcon/>
          Create an interview
        </Fab>) : null}
        
        <Fab
          variant="extended"
          size="small"
          color="primary"
          aria-label="add"
          className={classes.margin}
          onClick={() => {
            props.setStatusScheduleBusyModal(true);
          }}
        >
          <AddIcon/>
          Add busy date
        </Fab>
        
        <div className={classes.formWrapper}>
        {authenticationService.isAdmin() ? (<><TextField
            id="filterTeam"
            select
            label="Filter by team"
            value={filterTeam}
            onChange={handleChangeFilterByTeam}
            SelectProps={{
              native: true,
            }}
            className={classes.formControl}
          >
            <option key="filter_by_team" value="" ></option>
            <option key="filter_by_team_fe" value="fe_team">FE team</option>
            <option key="filter_by_team_it" value="it_team">IT team</option>
            <option key="filter_by_team_php" value="php_team">PHP team</option>
            <option key="filter_by_team_dotnet" value="dotnet_team">Dotnet team</option>
            <option key="filter_by_team_java" value="java_team">Java team</option>
            <option key="filter_by_team_hr" value="hr_team">HR team</option>
          </TextField>
          <TextField
          id="filterStatus"
          select
          label="Filter by status"
          value={filterStatus}
          onChange={handleChangeFilterByStatus}
          SelectProps={{
            native: true,
          }}
          className={classes.formControl}
        >
          <option key="filter_by_status" value="" ></option>
          <option key="filter_by_status_400" value="400" >Leader interview phase</option>
          <option key="filter_by_status_410" value="410" >Leader interviewed</option>
          <option key="filter_by_status_411" value="411" >Leader interviewed and succeed</option>
          <option key="filter_by_status_412" value="412" >Leader interviewed and ignored</option>
        </TextField></>
          ) : null}
          
        </div>
        
      </Grid>
    </Grid>
  )
}

export default ScheduleActionBar;
