import { SET_LOCATIONS, EDIT_LOCATION, ADD_LOCATION, DELETE_LOCATION } from "./locationsActions";

const initalState = {
  locations: []
};

export default (state = initalState, action) => {
  switch (action.type) {
    case SET_LOCATIONS:
      return { ...state, locations: action.payload };
    case ADD_LOCATION:
      return { ...state, locations: [...state.locations, action.payload] };
    case EDIT_LOCATION:
      return { ...state, locations: state.locations.map(
        (item, index) => index === action.payload.index ? action.payload.newLocation : item) 
      };
    case DELETE_LOCATION:
      return { ...state, locations: state.locations.filter((item, index) => index !== action.payload) };
    default:
      return state;
  }
};
