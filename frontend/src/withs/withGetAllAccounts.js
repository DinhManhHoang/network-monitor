import React from 'react';
import { connect } from 'react-redux';
import { getAllAccounts } from '../actions/account/getAllAccounts';

function WithGetAllAccounts(WrappedComponent) {
  
  function mapStateToProps(state) {
    return {
      loading: state.getAllAccounts.loading,
      error: state.getAllAccounts.error,
      accounts: state.getAllAccounts.accounts,
    }
  }
    
  function mapDispatchToProps(dispatch) {
    return {
      getAllAccounts: (options) => { dispatch(getAllAccounts(options)) },
    }
  }

  function NewComponent({ loading, error, accounts, getAllAccounts, ...props }) {

    return <WrappedComponent 
      getAllAccountsState={{
        loading,
        error,
        accounts,
      }}
      getAllAccountsAction={{
        getAllAccounts,
      }}
      {...props}
    />
  }
  
  return connect(mapStateToProps, mapDispatchToProps)(NewComponent)
}

const withGetAllAccounts = WithGetAllAccounts

export default withGetAllAccounts