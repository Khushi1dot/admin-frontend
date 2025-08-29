// REDUX(INJECT-MODEL)

import { createStore, combineReducers, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";

import authReducer from "./model/auth/Reducer";
import postReducer from "./model/posts/Reducer";
import dashboardReducer from "./model/dashboard/Reducer";

const rootReducers = combineReducers({

  auth: authReducer,
  posts:postReducer,
dashboard: dashboardReducer,
});

const store = createStore(rootReducers, applyMiddleware(thunk));

export default store;