import React from 'react';
import { connect } from 'react-redux';
import { changeLogType } from '../actions/logType/changeLogType';

function WithChangeLogType(WrappedComponent) {
  
  function mapStateToProps(state) {
    return {
      logType: state.changeLogType.logType,
    }
  }
    
  function mapDispatchToProps(dispatch) {
    return {
      changeLogType: (logType) => { dispatch(changeLogType(logType)) },
    }
  }

  function NewComponent({ logType, changeLogType, ...props }) {

    return <WrappedComponent 
      changeLogTypeState={{
        logType
      }}
      changeLogTypeAction={{
        changeLogType,
      }}
      {...props}
    />
  }
  
  return connect(mapStateToProps, mapDispatchToProps)(NewComponent)
}

const withChangeLogType = WithChangeLogType

export default withChangeLogType