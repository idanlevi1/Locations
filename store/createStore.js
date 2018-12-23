import { createStore, combineReducers } from "redux";
import categoriesReducers from "./modules/categories/categoriesReducer";
import locationsReducer from "./modules/locations/locationsReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage
};

const allReducers = combineReducers({
  categories: categoriesReducers,
  locations: locationsReducer
});

const persistedReducer = persistReducer(persistConfig, allReducers);

export default () => {
  let store = createStore(persistedReducer);
  let persistor = persistStore(store);
  return { store, persistor };
};
