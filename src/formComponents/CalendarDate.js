import Calendar from "react-calendar"
import DatePicker from "react-date-picker"

// Default styles
import "react-calendar/dist/Calendar.css"
import "react-date-picker/dist/DatePicker.css"

const CalendarDate = ({ onChange, value, type }) => {
  return (
    <div>
      {type === "calendar" ? (
        <Calendar
          className="mx-auto rounded-2xl bg-white border border-gray-400 "
          showWeekNumbers={true}
          onChange={onChange}
          value={value}
        />
      ) : (
        <DatePicker
          // className="mx-auto rounded-2xl bg-white border -400 "
          onChange={onChange}
          value={value}
        />
      )}
    </div>
  )
}

export default CalendarDate
