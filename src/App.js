import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import IntroPage from './screens/intropage/IntroPage';
import MyNotes from './screens/mynotes/MyNotes';
import Login from './screens/login/Login';
import Register from './screens/register/Register';
import CreateNote from './screens/create-note/CreateNote';
import UpdateNotes from './screens/update-note/UpdateNotes';
import { useSelector } from 'react-redux';
import Profile from './screens/profile/Profile';


function App() {
  const {userInfo} = useSelector(state => state.userLogin)
  // const navigate =   useNavigate()
  return (
    <BrowserRouter>
      <Header />
      <main style={ {minHeight:"93vh"}}  > 
        <Routes>
          <Route path="/" element={
            userInfo.name? <Navigate to="/my_notes"/> : <IntroPage />}
              />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/my_notes" element={<MyNotes />} />
          <Route path="/create_notes" element={<CreateNote />} />
          <Route path="/update_note/:id" element={<UpdateNotes />} />
        </Routes>
      </main>
      <Footer />

    </BrowserRouter>

    
   
  );
}

export default App;
