import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Auth";

function PrivateRoute({children}){

    const {user} = useAuth();

    

    if(user){

      return children 
    }
    

    return  <Navigate to="/" /> ;
    
}

export default PrivateRoute;