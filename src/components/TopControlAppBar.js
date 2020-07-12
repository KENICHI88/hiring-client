import React from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

import DashboardIcon from '@material-ui/icons/Dashboard';
import EventRoundedIcon from '@material-ui/icons/EventRounded';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';

//////
import {GlobalDataContext} from '../context/GlobalData';
//////

const useStyles = makeStyles(theme => ({
  margin: {
    margin: '5px',
    padding: theme.spacing(0)
  },
}));

export default function TopControlAppBar(props) {
  const globalContext = React.useContext(GlobalDataContext);
  const {userInfo} = globalContext;
  const classes = useStyles();

  return (
    <div>
      {`Welcome, ${userInfo.username}`}
      <IconButton size="medium"  color="default" aria-label="email" className={classes.margin}>
        <Link to="/dashboard">
          <DashboardIcon />
        </Link>
      </IconButton>
      <IconButton size="medium"  color="primary" aria-label="calendar" className={classes.margin}>
        <Link to="/schedule">
          <EventRoundedIcon />
        </Link>
      </IconButton>
      <IconButton size="medium"  color="primary" aria-label="logout" className={classes.margin}>
        <Link to="/login">
          <ExitToAppOutlinedIcon />
        </Link>
      </IconButton>
    </div>
  );
}
