import React, { useState } from 'react'
import Dashboard from '../containers/Dashboard';

import {useEffectAsync} from '../utils/utils';

import Grid from '@material-ui/core/Grid';

import {Switch,
  Route,
  useRouteMatch} from 'react-router-dom';


import offerController from '../controllers/offerController';
import userController from '../controllers/userController';

import OfferDetail from '../components/Offer/Detail/OfferDetail';
import OfferList from '../components/Offer/List/OfferList';

const OfferPageWrapper = (props) => {
  let { path } = useRouteMatch();
  
  const [listOffer, setListOffer] = useState([]);
  const [listCandidate, setListCandidate] = useState([]);
  const [listApprover, setListApprover] = useState([]);
  
  useEffectAsync(() => {
    
    actionGetLists();
    // userController.getListCandidate(null, data => {
    //   setListCandidate(data.result);
    // })
    
  }, []);
  
  const actionGetLists = () => {
    actionGetListOffer();
    actionGetListCandidatePassed()
    actionGetListApprover()
  }
  
  const actionGetListOffer = () => {
    offerController.getList(null, data => {
      setListOffer(data.result);
    })
  }
  
  const actionGetListCandidatePassed = () => {
    userController.getListCandidatePassed(null, data => {
      setListCandidate(data.result);
    })
  }
  
  const actionGetListApprover = () => {
    userController.getList({type: 'isMember'}, data => {
      setListApprover(data.result);
    })
  }
  
  
  
  return (
    <>
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <Switch>
            <Route exact path={`${path}/`}>
               <OfferList
                dataList={listOffer}
              />
            </Route>
            <Route path={[`${path}/detail/:idDetail`, `${path}/detail/new`]}>
              <OfferDetail
                actionGetList={actionGetLists}
                listCandidate={listCandidate}
                listApprover={listApprover}
              />
            </Route>
            
          </Switch>
        </Grid>
      </Grid>
    </>
  )
}

OfferPageWrapper.propTypes = {

}


const TeamPage = Dashboard(OfferPageWrapper);

export default TeamPage;
