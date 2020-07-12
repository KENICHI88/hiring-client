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
import EmptyPage from '../src/pages/EmptyPage';
import TeamPage from '../src/pages/TeamPage';
import RolePage from '../src/pages/RolePage';
import UserPage from '../src/pages/UserPage';
import FilePage from '../src/pages/FilePage';
import OfferPage from '../src/pages/OfferPage';
import InterviewPage from '../src/pages/InterviewPage';
import SchedulePage from '../src/pages/SchedulePage';
import PermissionPage from '../src/pages/PermissionPage';
// import FilePage from '../src/pages/FilePage';
// import UserPage from './pages/UserPage';
// import SchedulePage from './pages/SchedulePage';
// import CandidatePage from './pages/CandidatePage';
// import DashboardPage from './pages/DashboardPage';
// import ReportPage from './pages/ReportPage';

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
              {/* Version 2 */}
              <PrivateRoute path="/empty" strict component={EmptyPage} />
              <PrivateRoute path="/team" strict component={TeamPage} />
              <PrivateRoute path="/role" strict component={RolePage} />
              <PrivateRoute path="/user" strict component={UserPage} />
              <PrivateRoute path="/file" strict component={FilePage} />
              <PrivateRoute path="/offer" strict component={OfferPage} />
              <PrivateRoute path="/interview" strict component={InterviewPage} />
              <PrivateRoute path="/schedule" strict component={SchedulePage} />
              <PrivateRoute path="/permission" strict component={PermissionPage} />
              {/* End Version 2 */}
              
              
              {/* <PrivateRoute path="/dashboard" component={DashboardPage} />
              <PrivateRoute path="/user" component={UserPage} />
              <PrivateRoute path="/schedule" component={SchedulePage} />
              <PrivateRoute path="/candidate" component={CandidatePage} />
              <PrivateRoute path="/report" component={ReportPage} /> */}


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
