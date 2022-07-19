import { combineReducers } from 'redux';
import LoginReducer from "../src/components/reducers/LoginReducer";

export default combineReducers({
    login: LoginReducer,
})