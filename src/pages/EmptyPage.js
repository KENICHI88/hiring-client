import React from 'react'

import Dashboard from '../containers/Dashboard';

const ReportPageWrapper = props => {
  return (
    <div>
      <h1>This is empty page</h1>
    </div>
  )
}


const ReportPage = Dashboard(ReportPageWrapper);
export default ReportPage;
