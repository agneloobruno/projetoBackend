import React from 'react'
import { Outlet } from "react-router-dom";
import SingIn from '../Components/Paginas/SingIn';
import './AppSingIn.css'

const AppSingIn = () => {
  return (
    <div className='SingIn'>
      <SingIn />
    </div>
  )
}

export default AppSingIn;