import React from 'react';
import { connect } from 'react-redux';
import { updateAccount } from '../actions/account/updateAccount';

function WithUpdateAccount(WrappedComponent) {
  
  function mapStateToProps(state) {
    return {
      loading: state.updateAccount.loading,
      error: state.updateAccount.error,
      account: state.updateAccount.account,
    }
  }
    
  function mapDispatchToProps(dispatch) {
    return {
      updateAccount: (options) => { dispatch(updateAccount(options)) },
    }
  }

  function NewComponent({ loading, error, account, updateAccount, ...props }) {

    return <WrappedComponent 
      updateAccountState={{
        loading,
        error,
        account,
      }}
      updateAccountAction={{
        updateAccount,
      }}
      {...props}
    />
  }
  
  return connect(mapStateToProps, mapDispatchToProps)(NewComponent)
}

const withUpdateAccount = WithUpdateAccount

export default withUpdateAccount