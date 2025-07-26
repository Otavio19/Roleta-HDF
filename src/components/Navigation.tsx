import React from 'react';
import { Link, useLocation } from 'react-router-dom';
const Navigation = () => {
  const location = useLocation();
  return <nav className="bg-purple-800 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold text-white">HDF Prêmios</div>
          <div className="flex space-x-4">
            <Link to="/" className={`px-4 py-2 rounded-md transition-colors ${location.pathname === '/' ? 'bg-white text-purple-800 font-medium' : 'text-white hover:bg-purple-600'}`}>
              Cadastro
            </Link>
            <Link to="/roleta" className={`px-4 py-2 rounded-md transition-colors ${location.pathname === '/roleta' ? 'bg-white text-purple-800 font-medium' : 'text-white hover:bg-purple-600'}`}>
              Roleta
            </Link>
          </div>
        </div>
      </div>
    </nav>;
};
export default Navigation;