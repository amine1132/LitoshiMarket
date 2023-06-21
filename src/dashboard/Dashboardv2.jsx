import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, Outlet,useMatch } from 'react-router-dom';
import Navgauche from './navgauche';
import Explorer from './Explorer/Explorer'
import Dashboard from './Dashboard';


export default function Dashboardv2() {
  return (
        <>
      <Navgauche/>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/explorer' element={<Explorer/>}/>
      </Routes>
      </>
  )
}
