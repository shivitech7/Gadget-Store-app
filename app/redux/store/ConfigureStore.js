import { createStore, combineReducers, applyMiddleware } from 'redux';
import tabReducer from '../reducers/TabReducers';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    tabReducer
})

const configureStore = () => {
    return createStore(rootReducer,
        applyMiddleware(thunk));
}

export default configureStore;