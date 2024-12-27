import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { ClerkProvider } from '@clerk/clerk-react';
import globalReducer from "./state";
import authReducer from './state/authSlice';
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./state/api";
import ClerkAuthProvider from './components/ClerkAuthProvider';
import PrivateRoute from './components/PrivateRoute';
import './index.css';

// Import your components
import App from './App';
import Layout from './scenes/layout';
import Dashboard from './scenes/dashboard';
import Products from './scenes/products';
import Customers from './scenes/customers';
import Overview from './scenes/overview';
import Daily from './scenes/daily';
import Monthly from './scenes/monthly';
import Breakdown from './scenes/breakdown';
import Admin from './scenes/admin';
import Performance from './scenes/performance';
import Transactions from './scenes/transactions';
import Geography from './scenes/geography';
import NotFound from './pages/NotFound';
import HeroAdminSection from './scenes/manage_hero_section';
import PopularProduct from './scenes/popular_product';

// Auth components
import Login from './scenes/auth/Login';
import Signup from './scenes/auth/Signup';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;



if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const store = configureStore({
  reducer: {
    global: globalReducer,
    auth: authReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});

setupListeners(store.dispatch);


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: <Login />
      },
      {
        path: "signup",
        element: <Signup />
      },
      {
        path: "verify-email",
        element: <Signup />
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> }, // This resolves `/dashboard`
      { path: "products", element: <Products /> },
      { path: "customers", element: <Customers /> },
      { path: "overview", element: <Overview /> },
      { path: "daily", element: <Daily /> },
      { path: "monthly", element: <Monthly /> },
      { path: "breakdown", element: <Breakdown /> },
      { path: "admin", element: <Admin /> },
      { path: "performance", element: <Performance /> },
      { path: "transactions", element: <Transactions /> },
      { path: "geography", element: <Geography /> },
      { path: "manage", element: <HeroAdminSection /> },
      { path: "popular-products", element: <PopularProduct /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY}
      navigate={(to) => router.navigate(to)}
    >
      <Provider store={store}>
        <ClerkAuthProvider>
          <RouterProvider router={router} />
        </ClerkAuthProvider>
      </Provider>
    </ClerkProvider>
  </React.StrictMode>
);
