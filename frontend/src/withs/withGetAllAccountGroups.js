import React from 'react';
import { connect } from 'react-redux';
import { getAllAccountGroups } from '../actions/accountGroup/getAllAccountGroups';

function WithGetAllAccountGroups(WrappedComponent) {
  
  function mapStateToProps(state) {
    return {
      loading: state.getAllAccountGroups.loading,
      error: state.getAllAccountGroups.error,
      accountGroups: state.getAllAccountGroups.accountGroups,
    }
  }
    
  function mapDispatchToProps(dispatch) {
    return {
      getAllAccountGroups: (options) => { dispatch(getAllAccountGroups(options)) },
    }
  }

  function NewComponent({ loading, error, accountGroups, getAllAccountGroups, ...props }) {

    return <WrappedComponent 
      getAllAccountGroupsState={{
        loading,
        error,
        accountGroups,
      }}
      getAllAccountGroupsAction={{
        getAllAccountGroups,
      }}
      {...props}
    />
  }
  
  return connect(mapStateToProps, mapDispatchToProps)(NewComponent)
}

const withGetAllAccountGroups = WithGetAllAccountGroups

export default withGetAllAccountGroups