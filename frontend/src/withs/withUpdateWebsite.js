import React from 'react';
import { connect } from 'react-redux';
import { updateWebsite } from '../actions/website/updateWebsite';

function WithUpdateWebsite(WrappedComponent) {
  
  function mapStateToProps(state) {
    return {
      loading: state.updateWebsite.loading,
      error: state.updateWebsite.error,
      website: state.updateWebsite.website,
    }
  }
    
  function mapDispatchToProps(dispatch) {
    return {
      updateWebsite: (options) => { dispatch(updateWebsite(options)) },
    }
  }

  function NewComponent({ loading, error, website, updateWebsite, ...props }) {

    return <WrappedComponent 
      updateWebsiteState={{
        loading,
        error,
        website,
      }}
      updateWebsiteAction={{
        updateWebsite,
      }}
      {...props}
    />
  }
  
  return connect(mapStateToProps, mapDispatchToProps)(NewComponent)
}

const withUpdateWebsite = WithUpdateWebsite

export default withUpdateWebsite