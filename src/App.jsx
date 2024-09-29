import React, { useEffect, useState } from 'react';
import Sidebar from './partials/Sidebar';
import Header from './partials/Header';
import Routers from './routes/Routers';
import './css/style.css'
import { useLocation } from 'react-router-dom';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { pathname } = location;
  const user = pathname !== '/'
  return (
    <div className="flex h-screen overflow-hidden">
      {user && <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {
          user &&
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        }
        <Routers />
      </div>
    </div>
  );
}

export default App;
