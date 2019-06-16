import React, { useEffect, useState } from 'react'
import Highcharts from 'highcharts'
import HC_map from 'highcharts/modules/map'
import HighchartsReact from 'highcharts-react-official'
import VietNam from '../../assets/maps/VietNam'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  map: {
    width: '100%',
  },
}))

HC_map(Highcharts)

const refCity = {
  "Hà Nội": "vn-318",
  "Đà Nẵng": "vn-da",
  "TP. Hồ Chí Minh": "vn-hc",
  "Hải Phòng": "vn-3623",
  "Cần Thơ": "vn-333",
}

async function getLogData() {
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

function LogCountMapChart() {

  const theme = useTheme()
  const classes = useStyles();
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const mapData = VietNam
  useEffect(() => {
    getLogData().then(_data => {
      let cityName = []
      _data.forEach(col => {
        if (!cityName.includes(col.city.name)) {
          cityName = [...cityName, col.city.name]
        }
      })
      let counter = {}
      cityName.forEach(city => {
        counter = {
          ...counter,
          [city]: 0,
        }
      })
      let x = 0
      _data.forEach(col => {
        counter[col.city.name] += col.count
      })
      let data = []
      for (let key in counter) {
        data = [...data, [refCity[key], counter[key]]]
      }
      setData(data)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (<div>Đang tải...</div>)
  }

  const options = {
    chart: {
      map: mapData,
    },

    title: {
      text: undefined,
    },
    
    mapNavigation: {
      enabled: true,
    },

    xAxis: {
      display: false,
    },

    colorAxis: {
      min: 1,
      type: 'logarithmic',
      minColor: '#eeeeee',
      maxColor: `${theme.palette.primary.dark}`,
      stops: [
        [0, '#eeeeee'],
        [0.33, `${theme.palette.primary.light}`],
        [0.67, `${theme.palette.primary.main}`],
        [1, `${theme.palette.primary.dark}`]
      ],
    },

    series: [{
        data: data.filter(value => value[1] > 0),
        name: 'Tổng số Logs',
        states: {
            hover: {
              color: `${theme.palette.secondary.main}`,
            }
        },
    }],
  }

  return (
    <div className={classes.map}>
      {loading === true && <Typography variant='body2' align='center'>Đang tải</Typography>}
      {loading === false && <HighchartsReact
        highcharts={Highcharts}
        constructorType={'mapChart'}
        options={options}
      />}
    </div>
  )
}

export default LogCountMapChart