import { ResponsiveCalendar } from "@nivo/calendar"
import moment from "moment"

const CalendarChart = ({ data }) => {
  const startDate = moment().format("YYYY-01-01")
  const endDate = moment().format("YYYY-12-31")

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    width: "90vw",
    height: "35vh",
  }

  return (
    <div style={containerStyle}>
      <ResponsiveCalendar
        data={data}
        from={startDate}
        to={endDate}
        emptyColor="#eeeeee"
        colors={["#f47560", "#e8c1a0", "#61cdbb", "#97e3d5"]}
        minValue="auto"
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        monthSpacing={15}
        monthBorderWidth={0}
        monthBorderColor="#000000"
        dayBorderColor="#ffffff"
        legends={[
          {
            anchor: "bottom-right",
            direction: "row",
            translateY: 36,
            itemCount: 4,
            itemWidth: 42,
            itemHeight: 36,
            itemsSpacing: 14,
            itemDirection: "right-to-left",
          },
        ]}
      />
    </div>
  )
}

export default CalendarChart
