import React from 'react';
import LocationsView from './LocationsView'
import { connect } from 'react-redux';
import Header from '../../components/Header';
import { deleteLocation, editLocation } from '../../store/modules/locations/locationsActions';

class Locations extends React.Component {
  static navigationOptions = {
    header: <Header title={'Locations'} addIcon={true}/>,
  };

  deleteLocationHandle = (element) => {
    let elementIndex = this.props.locations.findIndex((location) => location.name === element.name)
    this.props.onDeleteLocation(elementIndex);
  }

  editLocationHandle = (oldItem,NewItem) => {
    let itemIndex = this.props.locations.findIndex((location) => location.name === oldItem.name)
    this.props.onEditLocation(itemIndex,NewItem);
  }

  render() {
    return (
      <LocationsView 
      locations={this.props.locations}
      categories={this.props.categories}
      deleteLocationHandle={this.deleteLocationHandle}
      editLocationHandle={this.editLocationHandle}
      />
    );
  }
}

const mapStateToProps = state => {
  console.log('mapState[locations]:', state.locations.locations)
  return {
      locations: state.locations.locations,
      categories: state.categories.categories
  }
}

const mapActionsToProps = {
  onDeleteLocation: deleteLocation,
  onEditLocation: editLocation
}

export default connect(mapStateToProps,mapActionsToProps)(Locations);