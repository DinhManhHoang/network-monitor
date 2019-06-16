import React from 'react';
import { connect } from 'react-redux';
import { deleteWebsite } from '../actions/website/deleteWebsite';

function WithDeleteWebsite(WrappedComponent) {
  
  function mapStateToProps(state) {
    return {
      loading: state.deleteWebsite.loading,
      error: state.deleteWebsite.error,
      website: state.deleteWebsite.website,
    }
  }
    
  function mapDispatchToProps(dispatch) {
    return {
      deleteWebsite: (options) => { dispatch(deleteWebsite(options)) },
    }
  }

  function NewComponent({ loading, error, website, deleteWebsite, ...props }) {

    return <WrappedComponent 
      deleteWebsiteState={{
        loading,
        error,
        website,
      }}
      deleteWebsiteAction={{
        deleteWebsite,
      }}
      {...props}
    />
  }
  
  return connect(mapStateToProps, mapDispatchToProps)(NewComponent)
}

const withDeleteWebsite = WithDeleteWebsite

export default withDeleteWebsite