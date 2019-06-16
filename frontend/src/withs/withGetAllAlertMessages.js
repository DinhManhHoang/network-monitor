import React from 'react';
import { connect } from 'react-redux';
import { getAllAlertMessages } from '../actions/alertMessage/getAllAlertMessages';

function WithGetAllAlertMessages(WrappedComponent) {
  
  function mapStateToProps(state) {
    return {
      loading: state.getAllAlertMessages.loading,
      error: state.getAllAlertMessages.error,
      alertMessages: state.getAllAlertMessages.alertMessages,
    }
  }
    
  function mapDispatchToProps(dispatch) {
    return {
      getAllAlertMessages: (options) => { dispatch(getAllAlertMessages(options)) },
    }
  }

  function NewComponent({ loading, error, alertMessages, getAllAlertMessages, ...props }) {

    return <WrappedComponent 
      getAllAlertMessagesState={{
        loading,
        error,
        alertMessages,
      }}
      getAllAlertMessagesAction={{
        getAllAlertMessages,
      }}
      {...props}
    />
  }
  
  return connect(mapStateToProps, mapDispatchToProps)(NewComponent)
}

const withGetAllAlertMessages = WithGetAllAlertMessages

export default withGetAllAlertMessages