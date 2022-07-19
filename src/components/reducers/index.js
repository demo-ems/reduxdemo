import { combineReducers } from 'redux';
import LoginReducer from "./LoginReducer";
import UploadImageReducer from "./UploadImageReducer";
import SignUpReducer from './SignUpReducer';

const rootReducer = combineReducers({
    login: LoginReducer,
    UploadImageReducer: UploadImageReducer,
    SignUpReducer: SignUpReducer
});

export default rootReducer;