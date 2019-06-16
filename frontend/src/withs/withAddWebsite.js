import React from 'react';
import { connect } from 'react-redux';
import { addWebsite } from '../actions/website/addWebsite';

function WithAddWebsite(WrappedComponent) {
  
  function mapStateToProps(state) {
    return {
      loading: state.addWebsite.loading,
      error: state.addWebsite.error,
      website: state.addWebsite.website,
    }
  }
    
  function mapDispatchToProps(dispatch) {
    return {
      addWebsite: (options) => { dispatch(addWebsite(options)) },
    }
  }

  function NewComponent({ loading, error, website, addWebsite, ...props }) {

    return <WrappedComponent 
      addWebsiteState={{
        loading,
        error,
        website,
      }}
      addWebsiteAction={{
        addWebsite,
      }}
      {...props}
    />
  }
  
  return connect(mapStateToProps, mapDispatchToProps)(NewComponent)
}

const withAddWebsite = WithAddWebsite

export default withAddWebsite