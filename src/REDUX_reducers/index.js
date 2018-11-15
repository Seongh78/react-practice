/** --------------------
 *  Reducer
 *  --------------------
 *  src/reducers/index.js
 */
import { SELECTED } from '../REDUX_actions';
import { combineReducers } from 'redux';

const initialState = {
    selectedId : -1
}

// console.log(initialState);

const selected = (state = initialState, actions) => {
    switch(actions.type) {
        case SELECTED:
            console.log(actions.selectedId);
            
            return Object.assign({}, state, {
                selectedId: actions.selectedId
            });
        default:
            return state;
    }// switch
}

// const extra = (state = {value: ''}) => {

// }

const contactApp = combineReducers({
    selected
});

export default contactApp;