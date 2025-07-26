import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import WheelPage from './pages/WheelPage';
import Navigation from './components/Navigation';
export function App() {
  return <Router>
      <div className="min-h-screen bg-gradient-to-b from-purple-700 to-indigo-900 text-white">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<RegisterPage />} />
            <Route path="/roleta" element={<WheelPage />} />
          </Routes>
        </div>
      </div>
    </Router>;
}