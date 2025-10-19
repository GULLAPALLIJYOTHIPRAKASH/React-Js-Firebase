import { useEffect, useState } from "react";
import { useAuth } from "../context/Auth";
import { useLocation, useNavigate } from "react-router-dom";

function Login(){


    const [email, setEmail] = useState("test@gmail.com");
    const[pwd , setPwd] = useState("test123");

    const {Login} = useAuth();
    const navigate = useNavigate(); 
    const location = useLocation();   
    


    const handleAuth = async (e) => {

            e.preventDefault();
        

                await Login(email , pwd); 
                console.log("Login");

                navigate("/profile" ,{replace : true});

    }
    

    

    return(<>
    <div className="login-container">
        <div className="center">
            <div className="heading">
                <div  onClick={() => { navigate("/login")}} className={location.pathname == "/login" ?  "tab sign-in active" : "tab sign-in"}>Login</div>
                <div  onClick={() => { navigate("/")}} className={location.pathname == "/" ?  "tab sign-up active " : "tab sign-up" }>Create</div>
            </div>
            <form className="form" onSubmit={handleAuth}>
                
                <div className="field">
                    <label htmlFor="email">Email :</label>
                    <input onChange={(e) => setEmail(e.target.value) } value={email} type="email" name="email" id="email" placeholder="Enter Email id" />
                </div>
                
                <div className="field">
                    <label htmlFor="password">Password :</label>
                    <input onChange={(e) => setPwd(e.target.value)} value={pwd} type="password" name="password" id="password" placeholder="Enter password" />
                </div>
                <button  className="signup-btn">Create Account</button>
                
            </form>
        </div>
    </div>
    </>);
}

export default Login;