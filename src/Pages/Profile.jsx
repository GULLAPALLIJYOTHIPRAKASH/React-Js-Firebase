import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";

function Profile(){

    const {user , Logout} = useAuth();

    const navigate = useNavigate();

    

    
    
    const handleLogout =async () => {

        await Logout();
        console.log("logout");
        navigate("/" , {replace : true});


    }

    return(<>
    <div className="profile-container">
        <div className="profile-center">
            <div className="heading">
                <h1>My Profile</h1>
            </div>
            <div className="profile-info">
                <h1>Email : {user?.email}</h1>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    </div>
    </>);
}

export default Profile;