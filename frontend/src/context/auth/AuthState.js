import React, { useReducer } from 'react';
import axios from '../../axios';
import authReducer from './AuthReducer';
import AuthContext from './AuthContext';
import {
    LOGIN_USER, REGISTER_USER, UNREGISTER_USER,
    LOAD_USER, LOGOUT_USER
} from '../types';
import setAuthHeader from '../../utils/setAuthHeader';


const AuthState = props => {
    const initialState = {
        userDetails: null,
        token: localStorage.getItem('token'),


    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = async (userData) => {
        try {
            const responseData = await axios.post('/auth', userData)
            // if error then return and remove token from local storage
            if (responseData.data.error) {
                console.log(responseData.data.error)
                logout()
                localStorage.removeItem('token')
                return
            }
            // otherwise save it to localstorage and state
            console.log(responseData.data)
            localStorage.setItem('token', responseData.data.token)
            dispatch({
                type: LOGIN_USER,
                payload: responseData.data.token
            })
        } catch (error) {
            console.log(error)

        }

    }


    const logout = async () => {
        dispatch({
            type: LOGOUT_USER
        })

    }

    const unRegister = async () => {
        dispatch({
            type: UNREGISTER_USER
        })

    }
    const register = async (userData) => {
        try {
            const responseData = await axios.post('/user', userData)
            // if error then return and remove token from local storage
            console.log(responseData)
            if (responseData.data.error) {
                console.log(responseData.data.error)
                localStorage.removeItem('token')
                unRegister()
                return
            }
            // otherwise save it to localstorage and state
            console.log(responseData.data)
            localStorage.setItem('token', responseData.data.token)
            dispatch({
                type: REGISTER_USER,
                payload: responseData.data.token
            })
        } catch (error) {
            unRegister()
            console.log(error)

        }

    }

    const loadUser = async (token) => {
        try {
            if (token) {
                setAuthHeader(token)

            }
            const responseData = await axios.get('/auth')
            if (responseData.data.error) {
                console.log(responseData.data.error)
                localStorage.removeItem('token')
                unRegister()
                return
            }
            dispatch({
                type: LOAD_USER,
                payload: responseData.data
            })


        } catch (error) {
            console.log(error)
            localStorage.removeItem('token')
            unRegister()
        }

    }




    return (
        <AuthContext.Provider
            value={{
                userDetails: state.userDetails,
                token: state.token,
                login,
                register,
                loadUser,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;