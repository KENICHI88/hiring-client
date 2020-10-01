import React from 'react'
import {Route, Redirect} from 'react-router-dom';
import {authenticationService} from '../services/authentication.service';

export const PrivateRoute =({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={(props)=>{
      const currentUser = authenticationService.currentUserValue;
      if(!currentUser || !currentUser._id){
        return <Redirect to={{pathname: '/login', state: {from: props.location}}} />
      }
      return <Component {...props} />
    }}/>
  )
}
