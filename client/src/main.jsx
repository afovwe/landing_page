import React from 'react';
import ReactDOM from 'react-dom/client';
import {  createBrowserRouter, RouterProvider } from 'react-router-dom';
//import router from './routes';

import './index.css';
import App from './App';
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./state";
import { Provider } from "react-redux";
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/ProfilePage';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import DashboardItem from './pages/DashboardItem';

const store = configureStore({
  reducer: {
    global: globalReducer,
   
  },
 
});
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,  
    errorElement: <NotFound /> 
    
  },
    {
    path: "/dashboard",
    element: <Dashboard />, 
    children: [
      {
    path: "/dashboard/:itemId",
    element: <DashboardItem />, 
    },
  ] 
    
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
    <Provider store={store}>      
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
