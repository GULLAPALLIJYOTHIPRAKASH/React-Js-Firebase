import React , { useContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged , createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from "firebase/auth";

const AuthContext= React.createContext();


export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState({});



    // account creation
    const signUp =  (email, pwd) => {
        
        return  createUserWithEmailAndPassword(auth, email , pwd );

    }

    // account logout
    const Logout = () => {

       return   signOut(auth);


    }

    // account login
    const Login =  (email , pwd) => {

       return  signInWithEmailAndPassword(auth ,email , pwd);




    }


    


    useEffect(() => {


        // Get user based on authstatechange
        const checkauth = onAuthStateChanged(auth , (currentuser) => {


            setUser(currentuser);
            console.log(currentuser);
            
            
        })

        


        return () => { checkauth() };
    },[])


    return(<AuthContext.Provider value={{signUp , user , Logout , Login}}>{children}</AuthContext.Provider>)
}


// custom hook
export const useAuth =() => {

    return useContext(AuthContext);
}