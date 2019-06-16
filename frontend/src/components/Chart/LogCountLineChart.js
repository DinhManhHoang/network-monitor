import React from "react";
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

function LogCountLineChart() {

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
      let chartData = []
      logTypeName.forEach(value => {
        chartData = [
          ...chartData,
          {
            name: value,
            data: _data.filter(_value => {
              if (_value.type.typename === value) {
                return true
              } else {
                return false
              }
            }).map(_value => (
              [(new Date(_value.startDate)).getTime(), _value.count]
            ))
          }
        ]
      })
      let _chartData = []
      chartData.forEach(value => {
        const name = value.name
        const data = value.data
        let _data = []
        data.forEach(elem => {
          if (_data.length === 0) {
            _data.push(elem)
          } else {
            if (elem[0] === _data[_data.length - 1][0]) {
              _data[_data.length - 1][1] += elem[1]
            } else {
              _data.push(elem)
            }
          }
        })
        _chartData.push({
          name,
          data: _data,
        })
      })
      setChartData(_chartData)
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
            type: 'spline',
          },
          title: {
            text: undefined,
          },
          xAxis: {
            type: 'datetime',
          },
          yAxis: {
            title: 'Số logs',
          },
          legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
          },
          plotOptions: {
            spline: {
              lineWidth: 3,
              states: {
                hover: {
                  lineWidth: 4,
                }
              },
              marker: {
                enabled: false
              },
            }
          },
          series: chartData,
          responsive: {
            rules: [{
              condition: {
                maxWidth: 500,
              },
              chartOptions: {
                legend: {
                  layout: 'horizontal',
                  align: 'center',
                  verticalAlign: 'bottom',
                }
              },
            },],
          },
          time: {
            timezoneOffset: -7 * 60,
          },
        }}
      />}
  </div>
  )
}

export default LogCountLineChart