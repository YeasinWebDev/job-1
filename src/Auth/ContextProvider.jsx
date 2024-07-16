import React, { createContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "firebase/auth";
import axios from 'axios';
import { auth } from './firebaseConfig';
import useAxiosCommon from '../Hooks/useAxiosCommon';

export const AuthContext = createContext(null)
function ContextProvider({ children }) {
    const axiosCommon = useAxiosCommon()
    const [user, setUser] = useState(null)
    const [loading, setloading] = useState(true)

    const createUser = (email, pass) => {
        setloading(true);
        return createUserWithEmailAndPassword(auth, email, pass);
    };

    const signIn = (email, pass) => {
        setloading(true)
        return signInWithEmailAndPassword(auth, email, pass)
    }

    const LogOut = () => {
        setloading(true)
        signOut(auth)
    }



    // get the token from the server
    const getToken = (email) => {
        const data = axios.post(`${import.meta.env.VITE_API_URL}/jwt`, { email }, { withCredentials: true })
        return data
    }




    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser)
                await getToken(currentUser.email);
                setloading(false);
            } else {
                setUser(null);
                setloading(false);

            }
        });
        return () => {
            unSubscribe()
        }
    }, [])



    const authinfo = { user, setUser, createUser, signIn, LogOut,  loading, setloading }
    return (
        <AuthContext.Provider value={authinfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default ContextProvider