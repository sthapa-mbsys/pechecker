import {combineReducers} from 'redux';
import FileReducer from './fileReducer';
import ErroReducer from './errorReducer'
import LoaderReducer from './loaderReducer'

const combineReducer=combineReducers({
    peDatas:FileReducer,
    errorData:ErroReducer,
    loaderState:LoaderReducer
});

export default combineReducer;