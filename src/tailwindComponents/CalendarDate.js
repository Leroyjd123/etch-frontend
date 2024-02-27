import Calendar from "react-calendar"
import DatePicker from "react-date-picker"

import "../MyCalendar.css"
import 'react-date-picker/dist/DatePicker.css';

const CalendarDate = ({ onChange, value, type }) => {
  return (
    <>
      {type === "calendar" ? (
        <Calendar className="mx-auto rounded-2xl" showWeekNumbers={true} onChange={onChange} value={value} />
      ) : (
        <DatePicker onChange={onChange} value={value} />
      )}
    </>
  )
}

export default CalendarDate
