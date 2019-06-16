import React from 'react';
import { connect } from 'react-redux';
import { countLog } from '../actions/log/countLog';

function WithCountLog(WrappedComponent) {
  
  function mapStateToProps(state) {
    return {
      loading: state.countLog.loading,
      error: state.countLog.error,
      result: state.countLog.result,
    }
  }
    
  function mapDispatchToProps(dispatch) {
    return {
      countLog: (options) => { dispatch(countLog(options)) },
    }
  }

  function NewComponent({ loading, error, result, countLog, ...props }) {

    return <WrappedComponent 
      countLogState={{
        loading,
        error,
        result,
      }}
      countLogAction={{
        countLog,
      }}
      {...props}
    />
  }
  
  return connect(mapStateToProps, mapDispatchToProps)(NewComponent)
}

const withCountLog = WithCountLog

export default withCountLog