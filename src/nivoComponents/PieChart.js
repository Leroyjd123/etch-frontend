import { ResponsivePie } from "@nivo/pie"

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  width: "90vw",
  height: "35vh",
}

const PieChart = ({ data }) => {
  return (
    <div style={containerStyle}>
      <ResponsivePie
        data={data}
        innerRadius={0.5}
        margin={{ top: 25, left:25, right:25, bottom: 25 }}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
      />
    </div>
  )
}

export default PieChart
