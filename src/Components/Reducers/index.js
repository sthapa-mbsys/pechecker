import {combineReducers} from 'redux';
import FileReducer from './fileReducer';
import ErroReducer from './errorReducer'

const combineReducer=combineReducers({
    peDatas:FileReducer,
    errorData:ErroReducer
});

export default combineReducer;