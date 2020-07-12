import React, {useState, useEffect} from 'react';

//////////////
// import {api_GetAllCandidate,
//         api_CreateCandidate,
//         api_UpdateCandidate,
//         api_GetAllUser,
//         api_GetListLeaderWithBusyDate,
//         api_CreateInterview,
//         api_GetAllInterview,
//         api_CreateBusyDateTime,
//       } from '../api/callAPI';
//////////////


export const GlobalDataContext = React.createContext();

export const GlobalDataProvider = (props) => {
  
  const [messages, setMessage] = useState([]);
  const [userInfo, setInfoUser] = useState({});
  
  const actionSetMessage = (message) => {
    setMessage(message);
  }

  
  useEffect(() => {
  }, [])
  
  return (
    <GlobalDataContext.Provider value={{
      userInfo : userInfo,
      isCallAjax : false,
      error: [],
      isError: false,
      messages: [],
      testString: 'testing',
    }}>
      {props.children}
    </GlobalDataContext.Provider>
)}
