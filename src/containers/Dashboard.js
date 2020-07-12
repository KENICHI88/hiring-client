import React, { Component } from 'react';
import {authenticationService} from '../services/authentication.service';
///////
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import LeftDrawer from '../components/LeftDrawer';
import TopAppBar from '../components/TopAppBar';
// import CustomizedSnackbars from '../components/Snackbar';

const drawerWidth = 160;

const useStyles = withStyles(theme => ({
  root: {
    display: 'flex',
    width: '100%'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1, 2),
    marginTop: 54
  },
  toolbar: theme.mixins.toolbar,
}));


const Dashboard = (WrappedComponent) => {
  
  class HOC extends Component {
    constructor(props){
      super(props);
      this.currentUser = null;
    }
    
    componentDidMount(){
      this.currentUser = authenticationService.currentUserValue;
    }

    render() {
      return (
        <div className={this.props.classes.root}>
          <CssBaseline />
          
          <TopAppBar {...this.props} />
          
          <LeftDrawer {...this.props} />
          {/* <CustomizedSnackbars /> */}
          <main className={this.props.classes.content}>
            {/* <div className={this.props.classes.toolbar} /> */}
            <div className="content-wrapper">
              <WrappedComponent {...this.props} />
            </div>
          </main>
        </div>
        
      )
    }
  }
  
  return useStyles(HOC);
}

export default Dashboard;
