import React from "react";
import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Typography } from '@material-ui/core'

async function getAlertMessageData() {
  try {
    // Todo: Add authentication header
    const result = await axios({
      url: '/api/alertMessages',
      method: 'get',
      params: {
        groupDetails: 'true',
      }
    })
    return result.data
  } catch (e) {
    return []
  }
}

function AlertMessagePieChart() {

  const [chartData, setChartData] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    setLoading(true)
    getAlertMessageData().then(_data => {
      let alertGroup = []
      _data.forEach(col => {
        if (!alertGroup.includes(col.group.groupname)) {
          alertGroup = [...alertGroup, col.group.groupname]
        }
      })
      let counter = {}
      alertGroup.forEach(group => {
        counter = {
          ...counter,
          [group]: 0,
        }
      })
      _data.forEach(col => {
        counter[col.group.groupname] += 1
      })
      let chartData = []
      for (let key in counter) {
        chartData = [...chartData, { name: key, y: counter[key] }]
      }
      setChartData(chartData)
      setLoading(false)
    })
  }, [])

  return (
    <div
      style={{
        width: '100%',
      }}
    >
      {loading === true && <Typography variant='body2' align='center'>Đang tải</Typography>}
      {loading === false && <HighchartsReact
        highcharts={Highcharts}
        options={{
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
          },
          title: {
            text: undefined,
          },
          plotOptions: {
            pie: {
              dataLabels: {
                enabled: true,
                distance: -30,
              },
              startAngle: -90,
              endAngle: 90,
            }
          },
          series: [{
            type: 'pie',
            innerSize: '45%',
            data: chartData,
          }]
        }}
      />}
  </div>
  )
}

export default AlertMessagePieChart