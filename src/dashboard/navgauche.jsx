
import React, { useEffect, useState } from 'react';
import Bitcoin from './Bitcoin.svg'
import litecoinltclogo from './litecoinltclogo.svg'
import litoshi from './litoshi.svg'
import dogecoindogelogo from './dogecoindogelogo.svg'
import ouai from './ouai.svg'
import Vector from './Vector.svg'
import globalsearch from './globalsearch.svg'
import element3 from './element3.svg'
import notification from './notification.svg' 
import Footer from './Footer.svg'
import "./Dashboard.css"
import {Link} from 'react-router-dom'

export default function navgauche() {
    const [isConnected, setIsConnected] = useState(false);
    const [isLoggedOut, setIsLoggedOut] = useState(false);


  return (
<div className="gauche">
<div className="chain">
  <img src={litoshi} alt="" />
</div>
<div className="menu">
  <div className='menutop'>
    <div className='menu2'>
      <Link to="/dashboard"><button className='dashboard'><img src={Vector} alt=""/>Dashboard</button></Link>
      <Link to="/explorer"><button className='explorer'><img src={globalsearch} alt=""/>Explorer</button></Link>
      <button className='watchlist'><img src={ouai} alt=""/>Watchlist</button>
      <button className='alerts'><img src={notification} alt=""/>Alerts</button>
      <button className='multicharts'><img src={element3} alt=""/>Multicharts</button>
    </div>
    <div className='menuv1'>
      <button className='BRC'><img src={Bitcoin} alt=""/>Bitcoin</button>
      <button className='LTC'><img src={litecoinltclogo} alt=""/>Litecoin</button>
      <button className='DRC'><img src={dogecoindogelogo} alt=""/>Dogechain</button>
    </div>
  </div>
  <div className="menufooter">
    <button className='profile'><img src={Footer} alt=""/>Profile</button>
    {isConnected && (
      <button><img src={footer3} alt=""/>Log Out</button>
     )}
</div>
</div>
</div>
  )
}





