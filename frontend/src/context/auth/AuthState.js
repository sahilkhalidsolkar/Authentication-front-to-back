import React, { useReducer } from 'react';
import axios from '../../axios';
import authReducer from './AuthReducer';
import AuthContext from './AuthContext';
import { v4 as uuidv4 } from 'uuid';
import {
    LOGIN_USER, REGISTER_USER, UNREGISTER_USER,
    LOAD_USER, LOGOUT_USER, ADD_ERRORS,
    REMOVE_ALL_ERRORS, AUTOMATICALLY_REMOVE_SOME_ERRORS
} from '../types';
import setAuthHeader from '../../utils/setAuthHeader';


const AuthState = props => {
    const initialState = {
        userDetails: null,
        token: localStorage.getItem('token'),
        errors: []


    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = async (userData) => {
        try {
            const responseData = await axios.post('/auth', userData)

            // otherwise save it to localstorage and state
            console.log(responseData.data)
            localStorage.setItem('token', responseData.data.token)
            dispatch({
                type: LOGIN_USER,
                payload: responseData.data.token
            })
        } catch (error) {
            console.log(error.response.data)
            // if error then return and remove token from local storage
            if (error.response.data) {

                if (error.response.data.errors) {
                    const errors = error.response.data.errors.map(error => ({
                        id: uuidv4(),
                        error: error.msg
                    }))
                    addError(errors)
                }
                if (error.response.data.error) {
                    console.log('running..')
                    addError([{
                        id: uuidv4(),
                        error: error.response.data.error
                    }])
                }
                logout()
                localStorage.removeItem('token')
                return
            }

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

            // otherwise save it to localstorage and state
            console.log(responseData.data)
            localStorage.setItem('token', responseData.data.token)
            dispatch({
                type: REGISTER_USER,
                payload: responseData.data.token
            })
        } catch (error) {

            console.log(error.response.data)
            // if error then return and remove token from local storage
            if (error.response.data) {

                if (error.response.data.errors) {
                    const errors = error.response.data.errors.map(error => ({
                        id: uuidv4(),
                        error: error.msg
                    }))
                    addError(errors)
                }
                if (error.response.data.error) {
                    console.log('running..')
                    addError([{
                        id: uuidv4(),
                        error: error.response.data.error
                    }])



                }



                unRegister()

                localStorage.removeItem('token')
                return
            }

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
    // errors state management actions
    const addError = (errorData) => {
        dispatch({
            type: ADD_ERRORS,
            payload: errorData
        })
        setTimeout(() => {
            automaticallyRemoveSomeErrors(errorData)
        }, 5000);
    }
    const automaticallyRemoveSomeErrors = (errorData) => {
        // const newErrors=state.errors.filter(err)
        // console.log(state)
        dispatch({
            type: AUTOMATICALLY_REMOVE_SOME_ERRORS,
            payload: errorData
        })

    }
    const removeAllError = async () => {

        dispatch({
            type: REMOVE_ALL_ERRORS
        })

    }




    return (
        <AuthContext.Provider
            value={{
                userDetails: state.userDetails,
                token: state.token,
                errors: state.errors,
                login,
                register,
                loadUser,
                removeAllError,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;