import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';


export default function configureStore(initialState){
    let store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk)
    );
    return store;
}