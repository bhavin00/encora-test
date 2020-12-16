import { notesConstants } from '../constants';

export function notes(state = {
    items: [],
    loading: false,
    error: '',
    lastId: 0
}, action) {
    switch (action.type) {
        case notesConstants.ADD_EDIT_REQUEST:
            if(action.data && action.data.id) {
                return {
                    ...state,
                    items: state.items.map(item =>
                        item.id === action.data.id
                            ? { ...item, ...action.data }
                            : item
                    ) 
                }
            }
            return {
                ...state,
                items: [...state.items, {...action.data, id: state.lastId+1}],
                lastId: state.lastId+1
            };
        case notesConstants.DELETE_REQUEST:
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.id)
            };

        default:
            return state
    }
}