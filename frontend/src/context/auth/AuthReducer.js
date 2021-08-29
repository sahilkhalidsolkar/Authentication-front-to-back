import { LOGIN_USER, REGISTER_USER, LOGOUT_USER, UNREGISTER_USER, LOAD_USER } from '../types';

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

        default:
            return state;
    }
};