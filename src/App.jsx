import { Route, Routes } from 'react-router-dom';
import './App.css'
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import { AuthContextProvider } from './context/Auth';
import SignUp from './Pages/Signup';

function App(){

  return(<>
  <div className='wrapper'>
    <AuthContextProvider>

      <Routes>
        <Route path='/'  element={<SignUp/>} />
        <Route path='/login'  element={<Login/>} />
        <Route path='/profile' element={<PrivateRoute> <Profile/> </PrivateRoute> } />
      </Routes>
      </AuthContextProvider>

  </div>
  </>)
}

export default App;

