import React, { useRef, useEffect } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Paper, Grid, Typography } from '@material-ui/core'

import withGetAllCities from '../../withs/withGetAllCities'
import withChangeCity from '../../withs/withChangeCity'
import withDateRange from '../../withs/withDateRange'
import withCountLog from '../../withs/withCountLog'

import DateRangePicker from '../DateRangePicker/DateRangePicker'


const useStyles = makeStyles(theme => ({
  chart: {
    width: '100%',
  },
}))

function LineChart({ changeCityState, dateRangeState, dateRangeAction, getAllCitiesState, countLogState, countLogAction, zoomable, title, showDateRangePicker }) {

  const { cities } = getAllCitiesState
  const { city } = changeCityState
  const { startDate, endDate } = dateRangeState
  const { changeDateRange } = dateRangeAction
  const { result } = countLogState
  const { countLog } = countLogAction
  const classes = useStyles()
  const chartEl = useRef(null)
  const theme = useTheme()

  useEffect(() => {
    if ((cities.length > 0) && (city < cities.length) && (city >= 0)) {
      countLog({
        city: cities[city]._id,
        startDate,
        endDate,
      })
    }
  }, [cities, city, startDate, endDate])

  useEffect(() => {
    if (countLogState.error == null ) {
      if (countLogState.loading === true) {
        chartEl.current.chart.showLoading()
      } else {
        chartEl.current.chart.hideLoading()
      }
      if (zoomable !== true) {
        changeDateRange({})
      }
    } 
  }, [countLogState.loading])

  function handleZoom(event) {
    event.preventDefault()
    const startDate = new Date(Math.round(event.xAxis[0].min))
    const endDate = new Date(Math.round(event.xAxis[0].max))
    changeDateRange({ startDate, endDate })
  }

  if (countLogState.error === true) {
    return <Typography variant='body1'>Đã xảy ra lỗi</Typography>
  }

  let typename = []
  result.forEach(value => {
    if (!typename.includes(value.type.typename)) {
      typename = [...typename, value.type.typename]
    }
  });

  typename.sort()

  let chartData = []
  typename.forEach(value => {
    chartData = [
      ...chartData,
      {
        name: value,
        data: result.filter(_value => {
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

  const zoomOptions = {
    zoomType: 'x',
    events: {
      selection: handleZoom,
    },
    resetZoomButton: {
      theme: {
        fill: `${theme.palette.common.white}`,
        stroke: `${theme.palette.common.black}`,
        r: 0,
        states: {
          hover: {
            fill: `${theme.palette.primary.main}`,
            stroke: `${theme.palette.common.black}`,
            style: {
              color: 'white'
            }
          }
        }
      }
    }
  }

  const options = {

    chart: zoomable === true ? zoomOptions : {},

    title: {
      text: title != null ? title : 'Biểu đồ',
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
      series: {
        label: {
          connectorAllowed: false
        },
      },
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
    }
  }

  return (
    <Paper className={classes.chart}>
      <Grid container spacing={0}>
        <Grid item xs={12}>  
          { showDateRangePicker === true 
            ? <DateRangePicker /> 
            : null }
        </Grid>
        <Grid item xs={12}>  
          <HighchartsReact
            ref={chartEl}
            highcharts={Highcharts}
            options={options}
          />
        </Grid>
      </Grid>
    </Paper>
  )
}

export default withGetAllCities(withChangeCity(withDateRange(withCountLog(LineChart))))