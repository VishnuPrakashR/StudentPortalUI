import React, { useEffect } from 'react';
import './App.css';
import router from './Routes';
import { RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  useEffect(()=>{
    document.title = "LBU HRM";
  });
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
