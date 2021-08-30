import {
    LOGIN_USER, REGISTER_USER, LOGOUT_USER, UNREGISTER_USER, LOAD_USER, ADD_ERRORS,
    REMOVE_ALL_ERRORS, AUTOMATICALLY_REMOVE_SOME_ERRORS
} from '../types';

export default (state, action) => {
    console.log(action)
    switch (action.type) {
        case REGISTER_USER:
        case LOGIN_USER:
            return { ...state, token: action.payload }
        case UNREGISTER_USER:
        case LOGOUT_USER:
            return { ...state, token: null, userDetails: null }
        case LOAD_USER:
            return { ...state, userDetails: action.payload }
        case ADD_ERRORS:
            return { ...state, errors: [...state.errors, ...action.payload] }
        case REMOVE_ALL_ERRORS:
            return { ...state, errors: [] }
        case AUTOMATICALLY_REMOVE_SOME_ERRORS:
            const newListOfErrors = state.errors.filter(errors => {
                return action.payload.find(payloadError => payloadError.id === errors.id) ? false : true
            })
            console.log(newListOfErrors)
            return { ...state, errors: [...newListOfErrors] }

        default:
            return state;
    }
};