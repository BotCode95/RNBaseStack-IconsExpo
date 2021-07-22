import React, {createContext, useEffect, useReducer} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../api/Api';
import { Usuario, LoginResponse, LoginData, RegisterData } from '../interfaces/appInterface';
import { authReducer, AuthState } from './authReducer';

type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: Usuario | null;
    status: 'checking' |'authenticated' | 'not-authenticated';
    signUp : (registerData: RegisterData) => void;
    signIn : (loginData: LoginData) => void;
    logOut : () => void;
    removeError : () => void;

}

const authInitialState: AuthState = {
    status: 'checking',
    token: null,
    user: null,
    errorMessage: ''
}

export const AuthContext = createContext({} as AuthContextProps)

export const AuthProvider = ({children}: any) => {

    const [state, dispatch] = useReducer(authReducer, authInitialState)

    useEffect(() => {
        validateToken()
    }, []);

    const validateToken = async () => {
        const token = await AsyncStorage.getItem('token')
        //no token, no autenticado
        if(!token) return dispatch({type: 'notAuthenticated'})

        //hay token !validar
        const resp = await Api.get('/auth');
        if(resp.data !== 200) {
            return dispatch({type: 'notAuthenticated'})
        }
        await AsyncStorage.setItem('token', resp.data.token)
        dispatch({
            type: 'signUp',
            payload: {
                token: resp.data.token,
                user: resp.data.usuario
            }
        })
    }

    const signIn = async ({correo,password}: LoginData) => {
        try {
            const resp = await Api.post<LoginResponse>('/auth/login',{correo, password})
            dispatch({type: 'signUp', payload: {token:resp.data.token, user: resp.data.usuario}})

            await AsyncStorage.setItem('token', resp.data.token)
        } catch (error) {
            dispatch({type: 'addError', payload: error.response.data.msg || 'Información incorrecta'})
        }
    };
    const signUp = async ({correo, password, nombre} : RegisterData) => {
       try {
            const {data} = await Api.post<LoginResponse>('/usuarios',{correo, password, nombre})
            dispatch({type: 'signUp', payload: {token:data.token, user: data.usuario}})

            await AsyncStorage.setItem('token', data.token)
       }catch (error) {
            dispatch({type: 'addError', payload: error.response.data.errores[0].msg || 'Revise la información'})
       }

    };
    const logOut = async() => {
        await AsyncStorage.removeItem('token');
        dispatch({type: 'logout'})
    };
    const removeError = () => {
        dispatch({type: 'removeError'})
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                signUp,
                signIn,
                logOut,
                removeError,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}