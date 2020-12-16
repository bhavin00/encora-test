import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { notes } from './notes.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
    authentication,
    alert,
    notes
});

export default rootReducer;