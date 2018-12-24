import { SET_CATEGORIES, ADD_CATEGORY, EDIT_CATEGORY, DELETE_CATEGORY } from "./categoriesActions";

const initalState = {
  categories: []
};

export default (state = initalState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return { ...state, categories: action.payload };
    case ADD_CATEGORY:
      return { ...state, categories: [...state.categories, action.payload] };
    case EDIT_CATEGORY:
      return { ...state, categories: state.categories.map(
        (item, index) => index === action.payload.index ? action.payload.newCategory : item) 
      };
    case DELETE_CATEGORY:
      return { ...state, categories: state.categories.filter((item, index) => index !== action.payload) };
    default:
      return state;
  }
};
