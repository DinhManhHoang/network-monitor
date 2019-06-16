import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import withDateRange from '../../withs/withDateRange';

const useStyles = makeStyles(theme => ({
  middle: {
    textAlign: 'center',
  }
}));

function DateRangePicker({ dateRangeState, dateRangeAction }) {
  
  const classes = useStyles()
  const { startDate, endDate } = dateRangeState
  const { changeDateRange } = dateRangeAction

  function handleStartDateChange(startDate) {
    if (startDate == null) {
      changeDateRange({startDate: null, endDate})
    } else {
      if ((endDate == null) || (startDate._d <= endDate)) {
        changeDateRange({startDate: startDate._d, endDate})
      }
    }
  }

  function handleEndDateChange(endDate) {
    if (endDate == null) {
      changeDateRange({startDate, endDate: null})
    } else {
      if ((startDate == null) || (startDate <= endDate._d)) {
        changeDateRange({startDate, endDate: endDate._d})
      }
    }
  }

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Grid container spacing={2} justify="center">
        <Grid item sm={6} xs={12} className={classes.middle}>
          <DateTimePicker
            clearable
            ampm={false}
            label="Ngày bắt đầu"
            value={startDate != null ? startDate : null}
            onChange={handleStartDateChange}
            format={"DD/MM/YYYY, hh:mm:ss"}
          />
        </Grid>
        <Grid item sm={6} xs={12} className={classes.middle}>
          <DateTimePicker
            clearable
            ampm={false}
            label="Ngày kết thúc"
            value={endDate != null ? endDate : null}
            onChange={handleEndDateChange}
            format={"DD/MM/YYYY, hh:mm:ss"}
          />
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

export default withDateRange(DateRangePicker);