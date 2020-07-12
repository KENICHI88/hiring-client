import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TopControlAppBar from './TopControlAppBar';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles(theme => ({
  title: {
    flexGrow: 1,
  },
  navWrapper: {
    minHeight: '54px'
  }
}))

function TopAppBard(props) {
  
  const classes = useStyle();
  
  return (
    <AppBar position="fixed" className={props.classes.appBar} style={{background: 'linear-gradient(135deg, rgba(1,136,158,1) 0%, rgba(1,136,158,1) 35%, rgba(0,212,255,1) 100%)'}}>
      <Toolbar className={classes.navWrapper}>
        <Typography variant="h6" noWrap className={classes.title}>
          Hiring dashboard
        </Typography>
        <TopControlAppBar />
      </Toolbar>
    </AppBar>

  )
}
export default TopAppBard
