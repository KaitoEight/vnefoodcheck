import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './AppLayout';
import Home from '../src/routes/Home';
import Login from './components/Auth/Login';
import Products from '../src/routes/Products';
import Reports from '../src/routes/Reports';
import Register from './components/Auth/Register';
import ProtectedRoute from './components/Auth/ProtectedRoute';  // Import ProtectedRoute
import './App.css';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "products",
        element: <ProtectedRoute element={Products} />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "reports",
        element: <ProtectedRoute element={Reports} />,
      }
    ],
  },
]);

ReactDOM.render(
  <RouterProvider router={router} />,
  document.getElementById('root')
);
