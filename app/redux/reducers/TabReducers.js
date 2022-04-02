import * as tabActionTypes from '../actions/TabActions';
import { SET_SELECTED_TAB } from '../constants';

const initialState = {
    selectedTab: ''
}

const tabReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SELECTED_TAB:
            return {
                ...state,
                selectedTab: action.payload.selectedTab
            }
        default:
            return state
    }
}

export default tabReducer;