import React from 'react';
import { connect } from 'react-redux';
import { changeCity } from '../actions/city/changeCity';

function WithChangeCity(WrappedComponent) {
  
  function mapStateToProps(state) {
    return {
      city: state.changeCity.city,
    }
  }
    
  function mapDispatchToProps(dispatch) {
    return {
      changeCity: (city) => { dispatch(changeCity(city)) },
    }
  }

  function NewComponent({ city, changeCity, ...props }) {

    return <WrappedComponent 
      changeCityState={{
        city
      }}
      changeCityAction={{
        changeCity,
      }}
      {...props}
    />
  }
  
  return connect(mapStateToProps, mapDispatchToProps)(NewComponent)
}

const withChangeCity = WithChangeCity

export default withChangeCity