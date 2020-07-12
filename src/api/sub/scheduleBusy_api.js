import axios from 'axios';
import {API_URL} from '../../constant/variables';

const scheduleBusy_api = {};

scheduleBusy_api.CreateBusyDateTime = (formData) => {
  return axios({
    url: `${API_URL}/scheduleBusy/saveOne`,
    method: 'POST',
    data : formData
  })
}
scheduleBusy_api.GetBusyDateByMonth = (monthYear) => {
  const dateTime = new Date(monthYear);
  const formatedMonthYear = dateTime.getFullYear()+'-'+dateTime.getMonth();
  return axios({
    url: `${API_URL}/scheduleBusy/getBusyDateByMonth/${formatedMonthYear}`,
    method: 'GET',
  });
}

export default scheduleBusy_api;
