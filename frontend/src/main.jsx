import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './Caminhos/App.jsx';
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import AppSingIn from './Caminhos/AppSingIn.jsx';
import AppSite from './Caminhos/AppSite.jsx';

const router = createBrowserRouter([
  {
    path:"/",
    element: <App />,
  },
  {
    path:"/Site",
    element: <AppSite/>
    },
  {
    path:"/SingIn",
    element: <AppSingIn />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
