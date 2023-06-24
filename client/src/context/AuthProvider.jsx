import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const Authcontext = createContext(null);

export const useAuth = () => {
    return useContext(Authcontext);
}

const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({})

    axios.defaults.headers.common["Authorization"] = auth?.token;

    useEffect(() => {
        const auth = JSON.parse(localStorage.getItem('auth'))
        if (auth) {
            setAuth(auth)
        }
    }, [])

    return (
        <Authcontext.Provider value={{
            auth, setAuth
        }} >
            {children}
        </Authcontext.Provider>
    )
}

export default AuthProvider