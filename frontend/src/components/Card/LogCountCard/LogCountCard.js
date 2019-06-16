import React from "react";
import SimpleCard from '../SimpleCard';
import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Typography } from '@material-ui/core'

async function getLogCountData() {
  try {
    // Todo: Add authentication header
    const result = await axios({
      url: '/api/logs/countLog',
      method: 'get',
      params: {
        cityDetails: 'true',
        typeDetails: 'true',
      },
    })
    return result.data
  } catch (e) {
    return []
  }
}

function LogCountChart() {

  const [chartData, setChartData] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    setLoading(true)
    getLogCountData().then(_data => {
      let logTypeName = []
      _data.forEach(col => {
        if (!logTypeName.includes(col.type.typename)) {
          logTypeName = [...logTypeName, col.type.typename]
        }
      })
      let counter = {}
      logTypeName.forEach(logType => {
        counter = {
          ...counter,
          [logType]: 0,
        }
      })
      _data.forEach(col => {
        counter[col.type.typename] += col.count
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
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
          },
          title: {
            text: undefined,
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.y} (~{point.percentage:.1f}%)</b>'
          },
          plotOptions: {
            pie: {
              cursor: 'pointer',
              dataLabels: {
                enabled: true,
              }
            }
          },
          series: [{
            name: 'Số lượng',
            colorByPoint: true,
            data: chartData,
          }]
        }}
      />}
    </div>
  )

}

export default LogCountChart