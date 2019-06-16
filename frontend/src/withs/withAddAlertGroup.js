import React from 'react';
import { connect } from 'react-redux';
import { addAlertGroup } from '../actions/alertGroup/addAlertGroup';

function WithAddAlertGroup(WrappedComponent) {
  
  function mapStateToProps(state) {
    return {
      loading: state.addAlertGroup.loading,
      error: state.addAlertGroup.error,
      alertGroup: state.addAlertGroup.alertGroup,
    }
  }
    
  function mapDispatchToProps(dispatch) {
    return {
      addAlertGroup: (options) => { dispatch(addAlertGroup(options)) },
    }
  }

  function NewComponent({ loading, error, alertGroup, addAlertGroup, ...props }) {

    return <WrappedComponent 
      addAlertGroupState={{
        loading,
        error,
        alertGroup,
      }}
      addAlertGroupAction={{
        addAlertGroup,
      }}
      {...props}
    />
  }
  
  return connect(mapStateToProps, mapDispatchToProps)(NewComponent)
}

const withAddAlertGroup = WithAddAlertGroup

export default withAddAlertGroup