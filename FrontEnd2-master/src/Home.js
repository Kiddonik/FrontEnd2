import React from 'react';
import { Link } from 'react-router-dom';
import  Dashboard  from "./Dashboard"
import { Route } from 'react-router-dom';

const Home = () =>{
    return (
      <div>
        <Dashboard/>
        <h1>Hey</h1>
      </div>
    );
  }
  
  export default Home;

  <Route path="/Home" element={<Home/>} />