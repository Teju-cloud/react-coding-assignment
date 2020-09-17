import { combineReducers } from 'redux';

import spaceReducer from './spaceReducer';
import payloadReducer from './payloadReducer'

export default combineReducers ({
    spaceX: spaceReducer,
    spacePayload: payloadReducer
})