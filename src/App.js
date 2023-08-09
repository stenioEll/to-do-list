import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from './pages/Home';
import Task from './pages/Tasks';


function App() {

  return (
    <Router>
      <Routes>
          <Route path= "/" element= {<Home/>}/>
          <Route path= "/Tasks" element= {<Task/>}/>
      </Routes>
    </Router>
  );
}

export default App;
