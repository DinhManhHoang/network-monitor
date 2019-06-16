import React from 'react';
import { connect } from 'react-redux';
import { deleteAlertGroup } from '../actions/alertGroup/deleteAlertGroup';

function WithDeleteAlertGroup(WrappedComponent) {
  
  function mapStateToProps(state) {
    return {
      loading: state.deleteAlertGroup.loading,
      error: state.deleteAlertGroup.error,
      alertGroup: state.deleteAlertGroup.alertGroup,
    }
  }
    
  function mapDispatchToProps(dispatch) {
    return {
      deleteAlertGroup: (options) => { dispatch(deleteAlertGroup(options)) },
    }
  }

  function NewComponent({ loading, error, alertGroup, deleteAlertGroup, ...props }) {

    return <WrappedComponent 
      deleteAlertGroupState={{
        loading,
        error,
        alertGroup,
      }}
      deleteAlertGroupAction={{
        deleteAlertGroup,
      }}
      {...props}
    />
  }
  
  return connect(mapStateToProps, mapDispatchToProps)(NewComponent)
}

const withDeleteAlertGroup = WithDeleteAlertGroup

export default withDeleteAlertGroup