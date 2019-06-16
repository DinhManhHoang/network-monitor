import React from 'react';
import { connect } from 'react-redux';
import { updateAlertGroup } from '../actions/alertGroup/updateAlertGroup';

function WithUpdateAlertGroup(WrappedComponent) {
  
  function mapStateToProps(state) {
    return {
      loading: state.updateAlertGroup.loading,
      error: state.updateAlertGroup.error,
      alertGroup: state.updateAlertGroup.alertGroup,
    }
  }
    
  function mapDispatchToProps(dispatch) {
    return {
      updateAlertGroup: (options) => { dispatch(updateAlertGroup(options)) },
    }
  }

  function NewComponent({ loading, error, alertGroup, updateAlertGroup, ...props }) {

    return <WrappedComponent 
      updateAlertGroupState={{
        loading,
        error,
        alertGroup,
      }}
      updateAlertGroupAction={{
        updateAlertGroup,
      }}
      {...props}
    />
  }
  
  return connect(mapStateToProps, mapDispatchToProps)(NewComponent)
}

const withUpdateAlertGroup = WithUpdateAlertGroup

export default withUpdateAlertGroup