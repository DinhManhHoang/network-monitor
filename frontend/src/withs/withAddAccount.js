import React from 'react';
import { connect } from 'react-redux';
import { addAccount } from '../actions/account/addAccount';

function WithAddAccount(WrappedComponent) {
  
  function mapStateToProps(state) {
    return {
      loading: state.addAccount.loading,
      error: state.addAccount.error,
      account: state.addAccount.account,
    }
  }
    
  function mapDispatchToProps(dispatch) {
    return {
      addAccount: (options) => { dispatch(addAccount(options)) },
    }
  }

  function NewComponent({ loading, error, account, addAccount, ...props }) {

    return <WrappedComponent 
      addAccountState={{
        loading,
        error,
        account,
      }}
      addAccountAction={{
        addAccount,
      }}
      {...props}
    />
  }
  
  return connect(mapStateToProps, mapDispatchToProps)(NewComponent)
}

const withAddAccount = WithAddAccount

export default withAddAccount