import React from 'react';
import { connect } from 'react-redux';
import { updatePermission } from '../actions/permission/updatePermission';

function WithUpdatePermission(WrappedComponent) {
  
  function mapStateToProps(state) {
    return {
      loading: state.updatePermission.loading,
      error: state.updatePermission.error,
      permission: state.updatePermission.permission,
    }
  }
    
  function mapDispatchToProps(dispatch) {
    return {
      updatePermission: (options) => { dispatch(updatePermission(options)) },
    }
  }

  function NewComponent({ loading, error, permission, updatePermission, ...props }) {

    return <WrappedComponent 
      updatePermissionState={{
        loading,
        error,
        permission,
      }}
      updatePermissionAction={{
        updatePermission,
      }}
      {...props}
    />
  }
  
  return connect(mapStateToProps, mapDispatchToProps)(NewComponent)
}

const withUpdatePermission = WithUpdatePermission

export default withUpdatePermission