import React from 'react';
import { connect } from 'react-redux';
import { getAllWebsites } from '../actions/website/getAllWebsites';

function WithGetAllWebsites(WrappedComponent) {
  
  function mapStateToProps(state) {
    return {
      loading: state.getAllWebsites.loading,
      error: state.getAllWebsites.error,
      websites: state.getAllWebsites.websites,
    }
  }
    
  function mapDispatchToProps(dispatch) {
    return {
      getAllWebsites: (options) => { dispatch(getAllWebsites(options)) },
    }
  }

  function NewComponent({ loading, error, websites, getAllWebsites, ...props }) {

    return <WrappedComponent 
      getAllWebsitesState={{
        loading,
        error,
        websites,
      }}
      getAllWebsitesAction={{
        getAllWebsites,
      }}
      {...props}
    />
  }
  
  return connect(mapStateToProps, mapDispatchToProps)(NewComponent)
}

const withGetAllWebsites = WithGetAllWebsites

export default withGetAllWebsites