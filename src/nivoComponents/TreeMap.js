import { ResponsiveTreeMap } from "@nivo/treemap"

const TreeMap = ({ data }) => (
  <>
    <h1>Your top 10 tags</h1>
    <ResponsiveTreeMap
      data={data}
      identity="name"
      value="loc"
      tile="sliceDice"
      leavesOnly={true}
      margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
      labelSkipSize={13}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", "3"]],
      }}
      enableParentLabel={false}
      parentLabelSize={10}
      parentLabelPosition="left"
      parentLabelPadding={0}
      parentLabelTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      nodeOpacity={0.55}
      borderWidth={2}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.1]],
      }}
    />
  </>
)

export default TreeMap
