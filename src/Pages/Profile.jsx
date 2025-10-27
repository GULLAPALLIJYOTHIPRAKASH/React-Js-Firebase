import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";

function Profile(){

    const {user , Logout} = useAuth();

    const navigate = useNavigate();

    const [moviesList , setMoviesList] = useState([]);
    const [title , setTitle] = useState("");
    const [year , setYear] = useState("");
    const [isOscar , setIsOscar] = useState(false);
    const [isEdit , setIsEdit] = useState({id: "" , status: false});

    const handleLogout =async () => {

        await Logout();
        console.log("logout");
        navigate("/" , {replace : true});


    }


    // acces table in firestore
    const MoviesCollection = collection(db , "movies")
    
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

    useEffect(() => {
        
        ReadMoivesDB();
       
    },[]);


    // submit doc to firestore
    const submitNewMovie =  async() => {

        try {
            

            // add doc to firestore using collection ref (table) and send data 
            const addNewMovie = await addDoc(MoviesCollection , {

                title : title,
                releaseDate: year,
                recievedAnOscar:isOscar

            })

            console.log(addNewMovie);

            setTitle("")
            setYear("")
            setIsOscar(false);
            
            ReadMoivesDB();
            
        } catch (error) {

            console.log(error);
            
            
        }


    }



    // delete doc from firestore
    const deleteMovie = async (id) => {


        try {

            // get  ref doc like row 
            const moiveDoc =doc(db , "movies" , id);

            // delete data from firestore 
            const delmovie = await deleteDoc(moiveDoc);

            console.log(delmovie);
            
            ReadMoivesDB();
        } catch (error) {

            console.log(error);
            
            
        }
    }

    
//  update doc to firestore
    const updateMovie = async (id , title , year , isOscar) => {

        try {
        

            // get doc ref
            const movieDoc = doc(db , "movies" , id);

            // update doc with doc and data
            const updateMovieDoc = await updateDoc(movieDoc , {
                title: title ,
                releaseDate : year,
                recievedAnOscar: isOscar
            });

            console.log(updateMovieDoc);


            // reset edit
            setIsEdit({id:"" , status :false});
            setTitle("")
            setYear("")
            setIsOscar(false);

            

            ReadMoivesDB();
        } catch (error) {

            console.log(error);
            
            
        }


       
    }


    // handle edit 
     const handleEdit = (id) => {        


        // single obj from id find
            const SingleMovie = moviesList.find((movie) => movie.id == id);

            
            setIsEdit({id , status : true});
            setTitle(SingleMovie.title);
            setYear(SingleMovie.releaseDate);
            setIsOscar(SingleMovie.recievedAnOscar);

            
            
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
            <br /><br />
            <div className="movies-list">
                <div>
                    <input  value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" id="title" placeholder="Movie title" />
                    <input  value={year} onChange={(e) => setYear(e.target.value)} type="text" name="date" id="releaseDate" placeholder="Movie date" />

                    <input type="checkbox" name="" id="oscar" checked={isOscar} onChange={(e) => setIsOscar(e.target.checked)} />
                    <label htmlFor="oscar">Received an Oscar</label>
                    <br />
                    <br />
                    {
                        isEdit?.status ?

                        <button onClick={(e) => updateMovie(isEdit.id , title , year , isOscar )}>Update Edit</button>
                        :<button onClick={submitNewMovie}>add Moive</button>

                    }
                </div>
                <br />
                <div className="heading">
                    <h1>Movie Lists {moviesList.length}</h1>
                </div>
                <br />
                <div className="movies-data">
                    {
                        moviesList?.map((item) => {

                            return(<div key={item.id} className="movie">

                                <h1 style={{color: item?.recievedAnOscar ? "green" : "red", }}>{item?.title}</h1>
                                <h3>Date:  {item?.releaseDate}</h3>
                                <button onClick={() => deleteMovie(item.id)}>delete</button>
                                <br /><br />
                                <button onClick={() =>  handleEdit(item.id) }>edit</button>
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