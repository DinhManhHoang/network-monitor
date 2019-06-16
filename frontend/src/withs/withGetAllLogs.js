import React from 'react';
import { connect } from 'react-redux';
import { getAllLogs } from '../actions/log/getAllLogs';

function WithGetAllLogs(WrappedComponent) {
  
  function mapStateToProps(state) {
    return {
      loading: state.getAllLogs.loading,
      error: state.getAllLogs.error,
      logs: state.getAllLogs.logs,
      total: state.getAllLogs.total,
    }
  }
    
  function mapDispatchToProps(dispatch) {
    return {
      getAllLogs: (options) => { dispatch(getAllLogs(options)) },
    }
  }

  function NewComponent({ loading, error, logs, total, getAllLogs, ...props }) {

    return <WrappedComponent 
      getAllLogsState={{
        loading,
        error,
        logs,
        total,
      }}
      getAllLogsAction={{
        getAllLogs,
      }}
      {...props}
    />
  }
  
  return connect(mapStateToProps, mapDispatchToProps)(NewComponent)
}

const withGetAllLogs = WithGetAllLogs

export default withGetAllLogs