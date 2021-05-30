import React, {useState, useEffect, createContext} from 'react';
import { auth } from "./config";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    // Data here
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            user
            ? localStorage.setItem('authUser', JSON.stringify(user))
            : localStorage.removeItem('authUser')

            setCurrentUser(user)
        });
    }, []);

    return (
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    )
}