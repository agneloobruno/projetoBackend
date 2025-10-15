import React from 'react'
import { Outlet } from "react-router-dom";
import Site from '../Components/Paginas/Site';
import './AppSite.css'

const AppSite = () => {
  return (
    <div className='Site'>
        <Site />
    </div>
  )
}

export default AppSite