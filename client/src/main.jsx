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
import Layout from './scenes/layout';
import ProfilePage from './pages/ProfilePage';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import DashboardItem from './pages/DashboardItem';
import Products from './scenes/products';
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./state/api";
import Customers from './scenes/customers';
import Admin from './scenes/admin';
import Transactions from './scenes/transactions';
import Geography from './scenes/geography';

const store = configureStore({
  reducer: {
    global: globalReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});
setupListeners(store.dispatch);


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // The main frontend website component
    errorElement: <NotFound />, // Optional: Remove this if you want to handle the NotFound page under the Layout component
  },
  {
    path: "/dashboard",
    element: <Layout />, // Use Layout as the main component for the dashboard
    children: [
      {
        path: "", // Matches "/dashboard"
        element: <Dashboard />,
      },
      {
        path: ":itemId", // Matches "/dashboard/:itemId"
        element: <DashboardItem />,
      },
    ],
  },
  {
    path: "/products",
    element: <Layout />, // Use Layout for the products section
    children: [
      {
        path: "", // Matches "/products"
        element: <Products />,
      },
    ],
  },
   {
    path: "/customers",
    element: <Layout />, // Use Layout for the products section
    children: [
      {
        path: "", // Matches "/products"
        element: <Customers />,
      },
    ],
  },
  {
    path: "/admin",
    element: <Layout />, // Use Layout for the products section
    children: [
      {
        path: "", // Matches "/products"
        element: <Admin />,
      },
    ],
  },
  {
    path: "/transactions",
    element: <Layout />, // Use Layout for the products section
    children: [
      {
        path: "", // Matches "/products"
        element: <Transactions />,
      },
    ],
  },
  {
    path: "/geography",
    element: <Layout />, // Use Layout for the products section
    children: [
      {
        path: "", // Matches "/products"
        element: <Geography />,
      },
    ],
  },
  {
    path: "/profile",
    element: <Layout />, // Use Layout for the profile section
    children: [
      {
        path: "", // Matches "/profile"
        element: <ProfilePage />,
      },
      {
        path: ":profileId", // Matches "/profile/:profileId"
        element: <Profile />,
      },
    ],
  },
  {
    path: "*", // Catch-all for any unmatched routes
    element: <Layout />, // Use Layout for the NotFound page as well
    children: [
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>      
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
