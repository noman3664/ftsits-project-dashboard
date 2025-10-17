import React from 'react';
import './App.css';
import Sidebar from './components/Layout/Sidebar';
import Navbar from './components/Layout/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

function App() {
  return (
      
      <div  className='p-0 m-0 box-border'>
    
        <Dashboard />
      </div> 
     
  );
}

export default App;
