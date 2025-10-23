import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

function Profile(){

    const {user , Logout} = useAuth();

    const navigate = useNavigate();

    const [moviesList , setMoviesList] = useState([]);

    const handleLogout =async () => {

        await Logout();
        console.log("logout");
        navigate("/" , {replace : true});


    }


    // acces table in firestore
    const MoviesCollection = collection(db , "movies")
    
    useEffect(() => {
        
        
        // Read firestore db
        const ReadMoivesDB  = async () => {

             try {
            
                // get All rows from firstore
            const data = await getDocs(MoviesCollection);

            //from data obj, the docs contains our actual data array
        
            // get obj arrays
            const filterData = data.docs.map((doc) => {return ({...doc.data() , id : doc.id})});

            console.log(filterData);

            setMoviesList(filterData)
            
            
        } catch (error) {

            console.log(error);
            
            
        }

        }

        ReadMoivesDB();
       
    },[])

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
            <br /><br />
            <div className="movies-list">
                <div>
                    <input type="text" name="title" id="title" placeholder="Movie title" />
                    <input type="text" name="date" id="releaseDate" placeholder="Movie date" />

                    <input type="checkbox" name="" id="oscar" />
                    <label htmlFor="oscar">Received an Oscar</label>
                    <br />
                    <br />
                    <button>add Moive</button>
                </div>
                <br />
                <div className="heading">
                    <h1>Movie Lists</h1>
                </div>
                <br />
                <div className="movies-data">
                    {
                        moviesList?.map((item) => {

                            return(<div key={item.id} className="movie">

                                <h1 style={{color: item?.recievedAnOscar ? "green" : "black", }}>{item?.title}</h1>
                                <h3>Date:  {item?.releaseDate}</h3>
                            </div>)
                        })
                    }
                </div>
            </div>
        </div>
    </div>
    </>);
}

export default Profile;