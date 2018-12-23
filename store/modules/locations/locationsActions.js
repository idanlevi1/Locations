export const SET_LOCATIONS = 'location:setLocations';
export const ADD_LOCATION = 'location:addLocation';
export const EDIT_LOCATION = 'location:editLocation';
export const DELETE_LOCATION = 'location:deleteLocation';

export const setLocations = locationsData => ({
    type: SET_LOCATIONS,
    payload: locationsData
});

export const addLocation = Location => ({
    type: ADD_LOCATION,
    payload: Location
});

export const editLocation = (index,newLocation) => ({
    type: EDIT_LOCATION,
    payload: { index: index, newLocation: newLocation}
});

export const deleteLocation = index => ({
    type: DELETE_LOCATION,
    payload: index
});