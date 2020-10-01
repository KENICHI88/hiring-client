import React, { useState, useEffect } from 'react';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import {GlobalDataProvider} from './context/GlobalData';

////////////
import {history} from './helpers/history';
import {authenticationService} from './services/authentication.service';
import {PrivateRoute} from './components/PrivateRoute';
////////////

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import LoginPage from '../src/pages/LoginPage';
import UserPage from './pages/UserPage';
import SchedulePage from './pages/SchedulePage';
import CandidatePage from './pages/CandidatePage';
import DashboardPage from './pages/DashboardPage';

const theme = createMuiTheme({
  palette: {
    primary: {
        main: '#006064'
      }
    }
  },
)


function App() {
  
  const [user, setUser] = useState(null);
  
  useEffect(() => {
  }, [])
  
  return (
    <GlobalDataProvider>
       <MuiThemeProvider theme={theme}>
        <Router history={history}>
          
          <div className="app-wrapper">
            <Switch>
              
              <Route path="/login">
                <LoginPage />
              </Route>
              <PrivateRoute path="/dashboard" component={DashboardPage} />
              <PrivateRoute path="/user" component={UserPage} />
              <PrivateRoute path="/schedule" component={SchedulePage} />
              <PrivateRoute path="/candidate" component={CandidatePage} />


              {/* <Route path="/dashboard">
                <UserPage/>
              </Route>
              <Route path="/schedule">
                <SchedulePage />
              </Route>
              <Route path="/candidate">
                <CandidatePage />
              </Route>
              <Route path="/user">
                <UserPage />
              </Route> */}
              <Route path="/">
                <LoginPage />
              </Route>

            </Switch>
          </div>
        
        </Router>
        
      </MuiThemeProvider>
    </GlobalDataProvider>
   
  );
}

export default App;
