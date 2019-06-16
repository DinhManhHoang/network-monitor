import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/authentication/login';
import { logout } from '../actions/authentication/logout';
import { register } from '../actions/authentication/register';

function WithAuthentication(WrappedComponent) {
  
  function mapStateToProps(state) {
    return {
      loading: state.authentication.loading,
      error: state.authentication.error,
      auth: state.authentication.auth,
    }
  }
    
  function mapDispatchToProps(dispatch) {
    return {
      login: (options) => { dispatch(login(options)) },
      logout: (options) => { dispatch(logout(options)) },
      register: (options) => { dispatch(register(options)) },
    }
  }

  function NewComponent({ loading, error, auth, login, logout, register, ...props }) {

    return <WrappedComponent 
      authenticationState={{
        loading,
        error,
        auth,
      }}
      authenticationAction={{
        login,
        logout,
        register,
      }}
      {...props}
    />
  }
  
  return connect(mapStateToProps, mapDispatchToProps)(NewComponent)
}

const withAuthentication = WithAuthentication

export default withAuthentication