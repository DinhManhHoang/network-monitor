import React from 'react';
import { connect } from 'react-redux';
import { getAllCities } from '../actions/city/getAllCities';

function WithGetAllCities(WrappedComponent) {
  
  function mapStateToProps(state) {
    return {
      loading: state.getAllCities.loading,
      error: state.getAllCities.error,
      cities: state.getAllCities.cities,
    }
  }
    
  function mapDispatchToProps(dispatch) {
    return {
      getAllCities: (options) => { dispatch(getAllCities(options)) },
    }
  }

  function NewComponent({ loading, error, cities, getAllCities, ...props }) {

    return <WrappedComponent 
      getAllCitiesState={{
        loading,
        error,
        cities,
      }}
      getAllCitiesAction={{
        getAllCities,
      }}
      {...props}
    />
  }
  
  return connect(mapStateToProps, mapDispatchToProps)(NewComponent)
}

const withGetAllCities = WithGetAllCities

export default withGetAllCities