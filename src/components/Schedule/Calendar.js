import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
import addMinutes from 'date-fns/addMinutes';


import {getArrayFromObjectList} from '../../utils/utils';
import {TEAM_LIST} from '../../constant/variables';

class CalendarComp extends React.Component {  
  constructor(props) {
    super(props);
    this.calendarComponentRef = React.createRef();
  }
  
  
  handleDateClick = (arg) => { // bind with an arrow function
    // this.props.selectDay(arg);
    // const calendarAPI = this.calendarComponentRef.current.getApi();
  }
  
  handleEventClick = (info) => {
  }
  
  datesRenderCustom = (arg) => {
    if(this.calendarComponentRef && this.calendarComponentRef.current !== null){
      const calendarAPI = this.calendarComponentRef.current.getApi();
      const currentDate = new Date(calendarAPI.state.currentDate);
      this.props.setActiveMonthYear(currentDate, 1);
    }
  }
  
  componentDidMount(){
    if(this.calendarComponentRef && this.calendarComponentRef.current !== null){
      const calendarAPI = this.calendarComponentRef.current.getApi();
      const currentDate = new Date(calendarAPI.state.currentDate);
      this.props.setActiveMonthYear(currentDate);
    }
  }
  
  render(){
    return (
        <FullCalendar 
          ref={this.calendarComponentRef}
          defaultView="dayGridMonth"
          themeSystem="bootstrap"
          plugins={[ dayGridPlugin, interactionPlugin]}
          dateClick={this.handleDateClick}
          eventClick={this.handleEventClick}
          events={this.props.events}
          datesRender={this.datesRenderCustom}
          eventLimit="3"
      />
    )
  }
  
}

export default CalendarComp
