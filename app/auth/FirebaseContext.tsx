'use client';

import { createContext, useContext, useState } from 'react';
import { getAuth, signInWithEmailAndPassword, UserCredential, updateProfile  } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { Session } from '@toolpad/core/AppProvider';


// this is not private information, this key is a public identifier used to locate the firebase instance
/// TODO: this should be moved to an .env file 
const firebaseConfig = {
    apiKey: "AIzaSyBWU789oPVXkMTzNmkn_igG8GuvWllx46k",
    authDomain: "cerebra-3f49d.firebaseapp.com",
    projectId: "cerebra-3f49d",
    storageBucket: "cerebra-3f49d.firebasestorage.app",
    messagingSenderId: "444671719754",
    appId: "1:444671719754:web:46f9e7499ac2c15259e9b3"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export interface ILoginData {
    email: string;
    password: string;
}

export type AuthContextType = {
    isAuthed: boolean;
    user: IUser | undefined;
    login: (loginData: ILoginData,  setSession: Function) => void;
    logout: () => void;
    db: Firestore;
    isLoading: boolean
    isError: boolean
}
export interface IUser {
    email: string;
    id: string;
}

export const AuthContext = createContext<AuthContextType>(null as any);

export const useAuth = () => {
    return useContext(AuthContext);
}

const auth = getAuth();

export const AuthProvider: React.FC<{children: React.ReactNode, onAuth: () => void, authed: boolean, setAuth: (auth: boolean) => void}> = ({children, authed, onAuth, setAuth}) => {
    const [user, setUser] = useState<IUser>()
    const isAuthed = authed;
    const [isLoading, setLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const login = (loginData: ILoginData, setSession: Function) => {
        // login via firebase
        console.log("Logging in", loginData)
        setLoading(true)
        setIsError(false)

        signInWithEmailAndPassword(auth, loginData.email, loginData.password)
        .then((userCredential: any) => {
            // succcess
            setUser({email: userCredential.user.email, id: userCredential.user.uid})

            // let user = auth.currentUser;
            // updateProfile(user!, {displayName: "Justin Warnes", photoURL: "https://avatars.githubusercontent.com/u/181878838?v=4"})


            setSession({
                user: {
                    name: userCredential.user.displayName,
                    email: userCredential.user.email,
                    image: userCredential.user.photoURL
                },
            });
            console.log(userCredential)
            setAuth(true)
            onAuth();
            
        }).catch((error) => {
            console.log("Login failed.", error)
            setIsError(true)
        }).finally(()=>{
            setTimeout(()=> setLoading(false), 1000)
        });
    }

    const logout = () => {
        setAuth(false)
    }

    return (
        <AuthContext.Provider value={{isAuthed, user, login, logout, db, isLoading, isError}}>
            {children}
        </AuthContext.Provider>
    )

}

