import React from 'react';
import { connect } from 'react-redux';
import { getAllLogTypes } from '../actions/logType/getAllLogTypes';

function WithGetAllLogTypes(WrappedComponent) {
  
  function mapStateToProps(state) {
    return {
      loading: state.getAllLogTypes.loading,
      error: state.getAllLogTypes.error,
      logTypes: state.getAllLogTypes.logTypes,
    }
  }
    
  function mapDispatchToProps(dispatch) {
    return {
      getAllLogTypes: (options) => { dispatch(getAllLogTypes(options)) },
    }
  }

  function NewComponent({ loading, error, logTypes, getAllLogTypes, ...props }) {

    return <WrappedComponent 
      getAllLogTypesState={{
        logTypes,
        loading,
        error,
      }}
      getAllLogTypesAction={{
        getAllLogTypes,
      }}
      {...props}
    />
  }
  
  return connect(mapStateToProps, mapDispatchToProps)(NewComponent)
}

const withGetAllLogTypes = WithGetAllLogTypes

export default withGetAllLogTypes