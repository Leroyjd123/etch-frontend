import { ResponsivePie } from "@nivo/pie"

const PieChart = ({ data }) => (
  <div style={{ height: 500, width: 500 }}>
    <ResponsivePie
      data={data}
      margin={{ top: 1, right: 100, bottom: 100, left: 100 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
    />
  </div>
)

export default PieChart
