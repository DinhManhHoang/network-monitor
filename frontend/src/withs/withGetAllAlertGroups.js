import React from 'react';
import { connect } from 'react-redux';
import { getAllAlertGroups } from '../actions/alertGroup/getAllAlertGroups';

function WithGetAllAlertGroups(WrappedComponent) {
  
  function mapStateToProps(state) {
    return {
      loading: state.getAllAlertGroups.loading,
      error: state.getAllAlertGroups.error,
      alertGroups: state.getAllAlertGroups.alertGroups,
    }
  }
    
  function mapDispatchToProps(dispatch) {
    return {
      getAllAlertGroups: (options) => { dispatch(getAllAlertGroups(options)) },
    }
  }

  function NewComponent({ loading, error, alertGroups, getAllAlertGroups, ...props }) {

    return <WrappedComponent 
      getAllAlertGroupsState={{
        loading,
        error,
        alertGroups,
      }}
      getAllAlertGroupsAction={{
        getAllAlertGroups,
      }}
      {...props}
    />
  }
  
  return connect(mapStateToProps, mapDispatchToProps)(NewComponent)
}

const withGetAllAlertGroups = WithGetAllAlertGroups

export default withGetAllAlertGroups