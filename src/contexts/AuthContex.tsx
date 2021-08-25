import { createContext, useEffect, useReducer } from "react";
import { User } from '@firebase/auth-types';
import { authReducer } from "./AuthReducer";
import { CreditCard } from "../interfaces/CreditCard";

//* Definir información
export interface AuthState {
    isLogged: boolean;
    id: string | undefined;
    role: 'admin' | 'client' | undefined;
    user: User | null;
    creditCard: CreditCard | null
}

//* Estado inicial
const authInitialState: AuthState = {
    isLogged: false,
    id: '',
    role: undefined,
    user: null,
    creditCard: null
}

//* Datos que deseo compartir globalmente
interface AuthContextProps {
    authState: AuthState;
    signIn: (user: AuthState) => void;
    signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);

const init = () => {

    const user = localStorage.getItem('user');

    if (user === null) {
        return { isLogged: false, user: null, id: undefined, role: undefined };
    } else {
        return JSON.parse(user);
    }

}

export const AuthContextProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {

    const [authState, dispatch] = useReducer(authReducer, authInitialState, init);

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(authState))
    }, [authState])

    const signIn = (user: AuthState) => {
        dispatch({
            type: 'login',
            payload: user
        })
    }

    const signOut = () => {
        dispatch({
            type: 'logout'
        })
    }

    return (
        <AuthContext.Provider value={{
            authState,
            signIn,
            signOut
        }}>
            {children}
        </AuthContext.Provider>
    )

}