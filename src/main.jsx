import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Dashboard from './dashboard/Dashboard.jsx'
import Routerv2 from './Route';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Routerv2 />
  </React.StrictMode>,
)
