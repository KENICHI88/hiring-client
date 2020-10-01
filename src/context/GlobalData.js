import React, {useState, useEffect} from 'react';
import candidateController from '../controllers/candidateController';

//////////////
import {api_GetAllCandidate,
        api_CreateCandidate,
        api_UpdateCandidate,
        api_GetAllUser,
        api_GetListLeaderWithBusyDate,
        api_CreateInterview,
        api_GetAllInterview,
        api_CreateBusyDateTime,
      } from '../api/callAPI';
//////////////


export const GlobalDataContext = React.createContext();

export const GlobalDataProvider = (props) => {
  
  const [listUser, setListUser] = useState([]);
  
  const [listCandidate, getListCandidate] = useState([]);
  
  const [messages, setMessage] = useState([]);
  const [userInfo, setInfoUser] = useState({});
  
  const actionGetAllCandidate = async (condition = null) => {
    const result = candidateController.getAllCandidate(condition);
    result.then(data => {
      if(data) {
        getListCandidate(data.data);
      }
    })
  }
  
  const actionGetAllUser = async () => {
    const result = api_GetAllUser();
    result.then(data => {
      if(data) {
        const adjustDate = data.data.filter(item => {
          return item.team != 'admin_team';
        })
        setListUser(adjustDate);
      }
    }).catch(error => {
      console.log(`Loie ne` +error);
    })
  }
  
  const actionSetMessage = (message) => {
    setMessage(message);
  }
  
  const actionGetUserLocal = () => {
    setInfoUser(JSON.parse(localStorage.getItem('userInfor')));
  }
  const actionSetUserLocal = (userInfo) => {
    setInfoUser(userInfo);
  }
  
  useEffect(() => {
    actionGetUserLocal();
    actionGetAllUser();
    // actionGetAllCandidate();
  }, [])
  
  return (
    <GlobalDataContext.Provider value={{
      userInfo : userInfo,
      listUser : listUser,
      listCandidate : listCandidate,
      listInterview : [],
      isCallAjax : false,
      error: [],
      isError: false,
      messages: [],
      testString: 'testing',
      act_SetUserInfo: (info) => {
        actionSetUserLocal(info);
      },
      act_GetAllCandidate: (condition) => {
        actionGetAllCandidate(condition);
      },
      act_SetMessage: (message) => {
        setMessage(message);
      },
      act_getAllLeader: () => {
        actionGetAllUser();
      },
    }}>
      {props.children}
    </GlobalDataContext.Provider>
)}
