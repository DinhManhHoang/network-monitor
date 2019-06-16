import React from 'react';
import { connect } from 'react-redux';
import { deleteAccount } from '../actions/account/deleteAccount';

function WithDeleteAccount(WrappedComponent) {
  
  function mapStateToProps(state) {
    return {
      loading: state.deleteAccount.loading,
      error: state.deleteAccount.error,
      account: state.deleteAccount.account,
    }
  }
    
  function mapDispatchToProps(dispatch) {
    return {
      deleteAccount: (options) => { dispatch(deleteAccount(options)) },
    }
  }

  function NewComponent({ loading, error, account, deleteAccount, ...props }) {

    return <WrappedComponent 
      deleteAccountState={{
        loading,
        error,
        account,
      }}
      deleteAccountAction={{
        deleteAccount,
      }}
      {...props}
    />
  }
  
  return connect(mapStateToProps, mapDispatchToProps)(NewComponent)
}

const withDeleteAccount = WithDeleteAccount

export default withDeleteAccount