
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormControl, InputGroup, ToastContainer } from 'react-bootstrap';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useState } from 'react';
import { Route, Routes } from 'react-router';
import Login from './Login';
import Signup from './Signup';
import RequireAuth from './RequireAuth';
import Home from './Home';

function App() {

  return (
    <div >
      <Routes>
        <Route path='/' element={<RequireAuth><Home></Home></RequireAuth>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
