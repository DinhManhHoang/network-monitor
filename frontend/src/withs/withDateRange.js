import React from 'react';
import { connect } from 'react-redux';
import { changeDateRange } from '../actions/dateRange/changeDateRange';

function WithDateRange(WrappedComponent) {
  
  function mapStateToProps(state) {
    return {
      startDate: state.dateRange.startDate,
      endDate: state.dateRange.endDate,
    }
  }
    
  function mapDispatchToProps(dispatch) {
    return {
      changeDateRange: (dateRange) => { dispatch(changeDateRange(dateRange)) },
    }
  }

  function NewComponent({ startDate, endDate, changeDateRange, ...props }) {

    return <WrappedComponent 
      dateRangeState={{
        startDate,
        endDate,
      }}
      dateRangeAction={{
        changeDateRange,
      }}
      {...props}
    />
  }
  
  return connect(mapStateToProps, mapDispatchToProps)(NewComponent)
}

const withDateRange = WithDateRange

export default withDateRange