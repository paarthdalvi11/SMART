import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';

import Dashboard from './pages/Dashboard';
import NewSession from './pages/NewSession';
import Documents from './pages/Documents';
import History from './pages/History';
import Settings from './pages/Settings';

function App() {
    return (
        <div className="main-layout flex h-screen">
            <Sidebar />
            <div className="flex flex-col flex-grow">
                <Header />
                <div className="p-4 overflow-y-auto">
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/session" element={<NewSession />} />
                        <Route path="/history" element={<History />} />
                        <Route path="/settings" element={<Settings />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;
