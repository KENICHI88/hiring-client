import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import {Link} from 'react-router-dom';

import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import DashboardIcon from '@material-ui/icons/Dashboard';
import EventRoundedIcon from '@material-ui/icons/EventRounded';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AssessmentIcon from '@material-ui/icons/Assessment';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import DescriptionIcon from '@material-ui/icons/Description';
import LockIcon from '@material-ui/icons/Lock';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  icon: {
    minWidth: '36px'
  }
}
));

function LeftDrawer(props) {
  const classes = useStyles();
  
  return (
    <Drawer
      className={props.classes.drawer}
      variant="permanent"
      classes={{
        paper: props.classes.drawerPaper,
      }}
    >
      <div className={props.classes.toolbar} />
      <List>
        {[
          // {text: 'Dashboard', link: '/dashboard', icon: <DashboardIcon />},
          // {text: 'Candidate', link: '/candidate', icon: <PeopleIcon />},
          // {text: 'Users', link: '/user', icon: <AccountBoxIcon />},
          // {text: 'Report', link: '/report', icon: <AssessmentIcon />},
          {text: 'Empty', link: '/empty', icon: <DashboardIcon />},
          {text: 'Team', link: '/team', icon: <PeopleAltIcon />},
          {text: 'Role', link: '/role', icon: <LockOpenIcon />},
          {text: 'Permission', link: '/permission', icon: <LockIcon />},
          {text: 'Schedule', link: '/schedule', icon: <EventRoundedIcon />},
          {text: 'File', link: '/file', icon: <DescriptionIcon />},
          {text: 'Interview', link: '/interview', icon: <AssessmentIcon />},
          {text: 'Offer', link: '/offer', icon: <AssessmentIcon />},
          {text: 'User', link: '/user', icon: <AccountBoxIcon />},
        ].map((item, index) => (
          <ListItem button key={item.text}>
            <ListItemIcon className={classes.icon}>{item.icon}</ListItemIcon>
            <Link to={item.link}>
              <ListItemText primary={item.text} />
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  )
}

export default LeftDrawer
