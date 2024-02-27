import moment from "moment"

const MetricsStat = ({ data }) => {
  let firstDate = { day: moment().format("YYYY-MM-DD"), value: 0 }
  let lastDate = { day: moment().format("YYYY-MM-DD"), value: 0 }

  const totalEntries = data.reduce((pV, cV) => pV + cV.value, 0)

  if (data && data.length > 0) {
    firstDate = data[0]
    lastDate = data[data.length - 1]
  }

  return (
    <div
      className="stats stats-vertical lg:stats-horizontal shadow gap-1 mt-2"
    >
      <div className="stat gap-2">
        <div className="stat-title">You first started on</div>
        <div className="stat-value">
          {moment(firstDate.day).format("DD-MM-YYYY")}
        </div>
        <div className="stat-desc">Total Entries: {firstDate.value}</div>
      </div>
      <div className="stat">
        <div className="stat-title">Your last entry was on</div>
        <div className="stat-value">
          {moment(lastDate.day).format("DD-MM-YYYY")}
        </div>
        <div className="stat-desc">Total Entries: {lastDate.value}</div>
      </div>
      <div className="stat">
        <div className="stat-title">You have logged a total of</div>
        <div className="stat-value">{data.length} Days</div>
        <div className="stat-desc">Total Entries: {totalEntries}</div>
      </div>
    </div>
  )
}

export default MetricsStat
