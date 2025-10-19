import React , { useContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged , createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from "firebase/auth";

const AuthContext= React.createContext(null);


export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState('');



    const signUp = async (email, pwd) => {

        return await createUserWithEmailAndPassword(auth, email , pwd );

    }

    const Logout =async () => {

       return  await signOut(auth);


    }

    const Login = async (email , pwd) => {

       return await signInWithEmailAndPassword(auth ,email , pwd);




    }


    


    useEffect(() => {

        const checkauth = onAuthStateChanged(auth , (currentuser) => {


            setUser(currentuser);
            
        })

        


        return () => { checkauth() };
    },[])


    return(<AuthContext.Provider value={{signUp , user , Logout , Login}}>{children}</AuthContext.Provider>)
}


export const useAuth =() => {

    return useContext(AuthContext);
}