import './App.css';
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // Certifique-se de que Navigate está aqui
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from './components/Dashboard';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
    const [user, setUser] = useState(null);

    return (
        <ErrorBoundary>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login onLogin={setUser} />} />
                    <Route path="/register" element={<Register />} />
                    <Route 
                        path="/dashboard" 
                        element={
                            user ? (
                                <Dashboard 
                                    user={user} 
                                    onLogout={() => setUser(null)} 
                                />
                            ) : (
                                <Navigate to="/" replace />
                            )
                        } 
                    />
                </Routes>
            </BrowserRouter>
        </ErrorBoundary>
    );
}

export default App;