import React from 'react';
import ReactDOM from 'react-dom/client';
import {  createBrowserRouter, RouterProvider } from 'react-router-dom';
//import router from './routes';

import './index.css';
import App from './App';
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/ProfilePage';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,  
    errorElement: <NotFound /> 
    
  },
    {
    path: "/dashboard",
    element: <Dashboard />,   
    
  },
    {
    path: "/profile",
    element: <ProfilePage />,  
    children: [
      {
    path: "/profile/:profileId",
    element: <Profile />,   
    
  },
    ] 
    
  },
   
 
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
