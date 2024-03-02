import moment from "moment"

/**
 * Displays metrics statistics for user entries, including the first and last entry dates and the total number of entries.
 */
const MetricsStat = ({ data }) => {
  const totalEntries = data.reduce((pV, cV) => pV + cV.value, 0)

  // Initialize with default values in case data is empty
  let firstDate = moment().format("YYYY-MM-DD")
  let lastDate = moment().format("YYYY-MM-DD")
  let firstValue = 0
  let lastValue = 0

  if (data.length > 0) {
    firstDate = data[0].day
    lastDate = data[data.length - 1].day
    firstValue = data[0].value
    lastValue = data[data.length - 1].value
  }

  return (
    <div className="stats stats-vertical lg:stats-horizontal shadow gap-1 mt-2">
      <div className="stat gap-2">
        <div className="stat-title">You first started on</div>
        <div className="stat-value">
          {moment(firstDate).format("DD-MM-YYYY")}
        </div>
        <div className="stat-desc">Total Entries: {firstValue}</div>
      </div>
      <div className="stat">
        <div className="stat-title">Your last entry was on</div>
        <div className="stat-value">
          {moment(lastDate).format("DD-MM-YYYY")}
        </div>
        <div className="stat-desc">Total Entries: {lastValue}</div>
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
